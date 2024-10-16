import { useAutoKeys } from "react-easier";
import ChatMessages from "./ChatMessages";
import ChatInputForm from "./ChatInputForm";

export default function App() {

  // omit the need to set keys in lists
  useAutoKeys();

  // our state/context
  const s = useStates("main", {
    chatMessages: [],
    newMessage: { userName: '', text: '' },
    eventSourceSSE: null
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
      <h3 className="m-0">Chat using SSE</h3>
    </header>
    <main className="container mt-5">
      <ChatMessages />
    </main>
    <ChatInputForm />
  </>
};