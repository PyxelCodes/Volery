import { useContext } from 'react';
import { WebSocketContext } from '../ws/WebSocketProvider';
import { InitialLoadingPage } from '../loader/InitialLoadingPage';

export const WaitForWs = ({ children }) => {
  const { conn } = useContext(WebSocketContext);

  if (!conn) {
    //TODO make this better 
    return <InitialLoadingPage text="Connecting" step="3"/>
  }

  return <>{children}</>;
};
