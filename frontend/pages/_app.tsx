import "../styles/globals.scss";
import "../styles/serverbar.scss";

declare global {
  export interface Window {
    config: {
      host: string;
      secure: boolean;
    };
    apireq: {
      remaining: number,
      queue: any[]
    }
  }
}

export default function Volery({ Component, pageProps }) {
  if(!process.browser) return <p> loading browser </p>
  window.config = {
    host: process.env.NODE_ENV === "development" ? "localhost:3000/api" : "",
    secure: process.env.NODE_ENV === "production",
  };
  window.apireq = {
    remaining: 50,
    queue: []
  }

  return <Component {...pageProps} />;
}
