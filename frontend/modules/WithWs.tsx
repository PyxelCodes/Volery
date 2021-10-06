import { WaitForWs } from './auth/WaitForWs';
import { UserStateProvider } from './ws/UserStateProvider';
import { WebSocketProvider } from './ws/WebSocketProvider';

export const WithWs = ({ children }) => (
  <>
    <WebSocketProvider>
      <WaitForWs>
        <UserStateProvider>{children}</UserStateProvider>
      </WaitForWs>
    </WebSocketProvider>
  </>
);
