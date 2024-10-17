import ChatMessages from "./ChatMessages";
import ChatInputForm from "./ChatInputForm";
import EmailModal from "./EmailModal";

export default function App() {

  // Omit the need to set keys in lists
  useAutoKeys();

  // our state/context
  const s = useStates("main", {
    chatMessages: [],
    newMessage: { userName: '', text: '' },
    showEmailModal: false,
    email: ''
  });

  // Start an SSE listener
  useEffect(() => {
    // Avoid getting double event sources in React Strict mode
    globalThis.eventSourceSSE && globalThis.eventSourceSSE.close();
    // New event soruce
    globalThis.eventSourceSSE = new EventSource('/api/chat-sse');
    // Listen to sse events (in this app: chat messages)
    globalThis.eventSourceSSE.onmessage = ({ data }) => {
      s.chatMessages.push(JSON.parse(data));
      setTimeout(() => window.scrollTo(0, 1000000), 100);
    };
  }, []);

  return <>
    <header className="container-fluid p-3 fixed-top">
      <h3 className="m-0">
        Chat using SSE
        <button
          onClick={() => s.showEmailModal = true}
          className="btn btn-info float-end"
        >
          Send mail
        </button>
      </h3>
    </header>
    <main className="container mt-5">
      {ChatMessages(s)}
    </main>
    <ChatInputForm />
    <EmailModal />
  </>
};