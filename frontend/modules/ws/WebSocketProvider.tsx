import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Connection, User } from "./types";
import { connect } from "./connect";
import { gatewayURL } from "../../constants/urls";
import { useContext } from "react";
import { AuthContext } from "./AuthUserContext";
import store from "./stores/AuthStore";

type V = Connection | null;

export const WebSocketContext = React.createContext<{
  conn: V;
  setUser: (u: User) => void;
  setConn: (u: Connection | null) => void;
}>({
  conn: null,
  setUser: () => {},
  setConn: () => {},
});

export const WebSocketProvider = ({ children }) => {
  const [conn, setConn] = useState<V>(null);
  const { replace } = useRouter();
  const isConnecting = useRef(false);

  let authUser = JSON.parse(store.getState())

  useEffect(() => {
    if (!conn && !isConnecting.current) {
      isConnecting.current = true;
      connect({
        waitToReconnect: true,
        url: gatewayURL,
        accessToken: authUser.accessToken,
      })
        .then((x) => {
          setConn(x);
        })
        .catch((x) => {
          if (x.code === 4001) {
            replace(`/?next=${window.location.pathname}`);
          }
        })
        .finally(() => {
          isConnecting.current = false;
        });
    }
  }, [conn, replace, authUser.accessToken]);

  return (
    <WebSocketContext.Provider
      value={useMemo(
        () => ({
          conn,
          setConn,
          setUser: (u: User) => {
            if (conn) {
              setConn({
                ...conn,
                user: u,
              });
            }
          },
        }),
        [conn]
      )}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
