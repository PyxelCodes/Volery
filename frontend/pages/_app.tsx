import { WaitForWs } from '../modules/auth/WaitForWs';
import { WebSocketProvider } from '../modules/ws/WebSocketProvider';
import Head from 'next/head';
import '../styles/globals.scss';
import '../styles/serverbar.scss';
import '../styles/channelbar.scss';
import '../styles/topbar.scss';
import '../styles/message.scss';
import '../styles/textarea.scss';
import '../styles/highlight.scss';
import '../styles/memberList.scss';
import '../styles/developers.scss';
import { UserStateProvider } from '../modules/ws/UserStateProvider';
import { WaitForAuth } from '../modules/ws/WaitForAuth';
import { InitialLoadingPage } from '../modules/loader/InitialLoadingPage';
import Modal from 'react-modal';
import { useRouter } from 'next/router';
import { UserClickable } from '../modules/ui/modals/UserClickable';
import { UserPopoutProvider } from '../modules/ws/UserPopoutContext';
import { useState } from 'react';

declare global {
  export interface Window {
    config: {
      host: string;
      secure: boolean;
      baseURL: string;
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
      host:
        process.env.NODE_ENV === 'development'
          ? 'localhost:3000/api'
          : `${window.location.hostname}/api`,
      baseURL:
        window.location.protocol +
        '//' +
        window.location.hostname +
        ':' +
        window.location.port +
        '/api',
      secure: process.env.NODE_ENV === 'production',
    };
    window.apireq = {
      remaining: 50,
      queue: [],
    };
    return children;
  } else {
    return <InitialLoadingPage text="Authenticating" step="2" />;
  }
}

export default function Volery({ Component, pageProps }) {
  Modal.setAppElement('#__next');

  let router = useRouter();

  let [top, setTop] = useState(0);

  if (Boolean(Component.noWs))
    return (
      <>
        <Head>
          <title>Volery</title>
        </Head>

        <Prepare>
          <WaitForAuth router={router}>
            <Component {...pageProps} />
          </WaitForAuth>
        </Prepare>
      </>
    );

  return (
    <>
      <Head>
        <title>Volery</title>
      </Head>

      <Prepare>
        <WaitForAuth router={router}>
          <WebSocketProvider>
            <WaitForWs>
              <UserStateProvider>
                <UserPopoutProvider>
                  <UserClickable />
                  <Component {...pageProps} misc={{ top, setTop }} />
                </UserPopoutProvider>
              </UserStateProvider>
            </WaitForWs>
          </WebSocketProvider>
        </WaitForAuth>
      </Prepare>
    </>
  );
}
