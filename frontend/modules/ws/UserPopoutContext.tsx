import React, { useContext, useMemo, useState } from 'react';
import logger from '../../lib/logger';
import { WebSocketContext } from './WebSocketProvider';

export const UserPopoutContext = React.createContext<{
  setId: (id: string) => void;
  id: string;
  setIsOpen: (state: boolean) => void;
  isOpen: boolean;
}>({
  setId: () => {},
  id: null,
  setIsOpen: () => {},
  isOpen: false,
});

export const UserPopoutProvider = ({ children }) => {
  let [id, setId] = useState(null);
  let [isOpen, setIsOpen] = useState(false);

  return (
    <UserPopoutContext.Provider
      value={useMemo(
        () => ({
          id,
          setId,
          setIsOpen,
          isOpen,
        }),
        [id, isOpen]
      )}
    >
      {children}
    </UserPopoutContext.Provider>
  );
};
