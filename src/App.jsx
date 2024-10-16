import ChatMessages from "./ChatMessages";
import ChatInputForm from "./ChatInputForm";
import EmailModal from "./EmailModal";

export default function App() {

  // omit the need to set keys in lists
  useAutoKeys();

  // our state/context
  const s = useStates("main", {
    chatMessages: [],
    newMessage: { userName: '', text: '' },
    eventSourceSSE: null,
    showEmailModal: false,
    email: ''
  });

  // start an SSE listener if not done
  if (!s.eventSourceSSE) {
    s.eventSourceSSE = new EventSource('/api/chat-sse');
    // listen to sse events (in this app: chat messages)
    s.eventSourceSSE.onmessage = ({ data }) => {
      s.chatMessages.push(JSON.parse(data));
      setTimeout(() => window.scrollTo(0, 1000000), 100);
    };
  }

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