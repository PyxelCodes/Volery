import React, { useContext, useMemo, useState } from "react";
import { WebSocketContext } from "./WebSocketProvider";

export const UserStateContext = React.createContext<{
  setUser: (u: any) => void;
  setCurrentCommunity: (c: any) => void;
  setCommunities: (c: any) => void;
  setCurrentChannel: (c: any) => void;
  setCurrentChannelMessages: (c: any, cb?: any) => Promise<void> | void;
  user: any;
  currentCommunity: any;
  communities: any;
  currentChannel: any;
  currentChannelMessages: any;
}>({
  setUser: () => {},
  setCurrentCommunity: () => {},
  setCommunities: () => {},
  setCurrentChannel: () => {},
  user: null,
  currentCommunity: null,
  communities: null,
  currentChannel: null,
  currentChannelMessages: null,
  setCurrentChannelMessages: () => {},
});

export const UserStateProvider = ({ children }) => {
  let wsContext = useContext(WebSocketContext);
  const [user, setUser] = useState(wsContext.conn.user);
  const [currentCommunity, setCurrentCommunity] = useState(null);
  const [communities, setCommunities] = useState(
    wsContext.conn.user.communities
  );
  const [currentChannel, setCurrentChannel] = useState(null);
  const [currentChannelMessages, setCurrentChannelMessages] = useState(null);

  let manageSetCurrentCommunity = (state) => {
    setCurrentCommunity(state);
    localStorage.setItem('last-community', state.id)
  };
  let manageSetCurrentChannel = (state) => {
      setCurrentChannel(state)
      localStorage.setItem('last-channel', state.id)
  }

  return (
    <UserStateContext.Provider
      value={useMemo(
        () => ({
          user,
          setUser,
          currentCommunity,
          setCurrentCommunity: manageSetCurrentCommunity,
          communities,
          setCommunities,
          currentChannel,
          setCurrentChannel: manageSetCurrentChannel,
          currentChannelMessages,
          setCurrentChannelMessages,
        }),
        [
          currentChannel,
          communities,
          currentCommunity,
          user,
          currentChannelMessages,
        ]
      )}
    >
      {children}
    </UserStateContext.Provider>
  );
};
