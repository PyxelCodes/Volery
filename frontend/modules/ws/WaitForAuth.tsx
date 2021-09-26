import { useContext, useState, useEffect } from 'react';
import { APIRequest } from '../fetch/APIRequest';
import { WebSocketContext } from '../ws/WebSocketProvider';
import {useRouter} from 'next/router'
import { AuthContext } from './AuthUserContext';
import { InitialLoadingPage } from '../loader/InitialLoadingPage';

export const WaitForAuth = ({ children }) => {
  const {setAuthUser} = useContext(AuthContext);

  let [authed, setAuthed] = useState<boolean>(null);

  let { replace } = useRouter();

  useEffect(() => {
    APIRequest('/auth', { noVersion: true })
      .then(x => {
        setAuthUser(x)
        console.log(x);
        setAuthed(true);
      })
      .catch(x => {
        replace('/?next=null')
      });
  }, []);

  if (!authed) {
    return <InitialLoadingPage text="Authenticating" step={2} />
  }

  return <>{children}</>;
};
