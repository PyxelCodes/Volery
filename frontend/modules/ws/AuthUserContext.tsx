import React, { useMemo, useState } from 'react';

export const AuthContext = React.createContext<{
  setAuthUser: (c: any) => void;
  authUser: any;
}>({
  setAuthUser: () => {},
  authUser: null,
});

export const AuthProvider = ({ children }) => {
  let [authUser, setAuthUser] = useState(null);

  return (
    <AuthContext.Provider
      value={useMemo(
        () => ({
          authUser,
          setAuthUser,
        }),
        [authUser]
      )}
    >
      {children}
    </AuthContext.Provider>
  );
};
