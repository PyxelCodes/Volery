import { useContext, useState, useEffect } from "react";
import { APIRequest } from "../fetch/APIRequest";
import { WebSocketContext } from "../ws/WebSocketProvider";

export const WaitForWsAndAuth = ({ children }) => {
  const { conn } = useContext(WebSocketContext);

  let [authed, setAuthed] = useState<boolean>(null);

  useEffect(() => {
    APIRequest("/auth", { noVersion: true })
      .then((x) => {
        setAuthed(true);
      })
      .catch((x) => console.log("failed", x));
  }, []);

  if (!conn || !authed) {
    //TODO make this better
    return <p> loading </p>;
  }

  return <>{children}</>;
};
