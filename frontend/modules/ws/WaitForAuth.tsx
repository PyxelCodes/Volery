import { useContext, useState, useEffect } from 'react';
import { APIRequest } from '../fetch/APIRequest';
import { WebSocketContext } from '../ws/WebSocketProvider';
import { useRouter } from 'next/router';
import { AuthContext } from './AuthUserContext';
import { InitialLoadingPage } from '../loader/InitialLoadingPage';
import { Component } from 'react';
import store from './stores/AuthStore';

// export const WaitForAuth = ({ children }) => {
//   const { setAuthUser, authUser } = useContext(AuthContext);

//   let [authed, setAuthed] = useState<boolean>(false);

//   let { replace } = useRouter();

//   useEffect(() => {
//     APIRequest('/auth', { noVersion: true })
//       .then(x => {
//         console.log(x);
//         setAuthUser(x);
//       })
//       .catch(x => {
//         if (x.message.includes('401')) replace('/api/auth/github');
//       });
//   }, [replace, setAuthUser]);

//   useEffect(() => {
//     console.log('authUser update', authUser);
//     setAuthed(true);
//   }, [authUser]);

//   console.log(authed, authUser);

//   if (!authed) {
//     return <InitialLoadingPage text="Authenticating" step={2} />;
//   }

//   return <>{children}</>;
// };

export class WaitForAuth extends Component<{ children, router }, { authed }> {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      authed: false,
    };

    APIRequest('/auth', { noVersion: true })
      .then(x => {
        store.dispatch({ type: 'SET', payload: JSON.stringify(x) })
        this.setState({ authed: true })
      })
      .catch(x => {
        if (x.message.includes('401')) this.props.router.replace('/api/auth/github');
      });
  }
  render() {
    if (!this.state.authed)
      return <InitialLoadingPage text="Authenticating" step={2} />;

    return this.props.children;
  }
}
