import { WaitForWsAndAuth } from "../modules/auth/WaitForWsAndAuth";
import { WebSocketProvider } from "../modules/ws/WebSocketProvider";
import "../styles/globals.scss";
import "../styles/serverbar.scss";
import "../styles/channelbar.scss";
import "../styles/topbar.scss";
import '../styles/message.scss'

declare global {
  export interface Window {
    config: {
      host: string;
      secure: boolean;
    };
    apireq: {
      remaining: number;
      queue: any[];
    };
  }
}

function Prepare({ children }) {
  if (process.browser) {
    window.config = {
      host: process.env.NODE_ENV === "development" ? "localhost:3000/api" : "",
      secure: process.env.NODE_ENV === "production",
    };
    window.apireq = {
      remaining: 50,
      queue: [],
    };
    return children;
  } else {
    return <p> loading </p>;
  }
}

export default function Volery({ Component, pageProps }) {
  return (
    <Prepare>
      <WebSocketProvider>
        <WaitForWsAndAuth>
          <Component {...pageProps} />
        </WaitForWsAndAuth>
      </WebSocketProvider>
    </Prepare>
  );
}
