import { useState, useEffect, useContext } from "react";
import { Serverbar } from "../modules/ui/Serverbar";
import { getUser } from "../modules/fetch/user";
import { User } from "../types/user";
import { SecondSidebar } from "../modules/ui/SecondSidebar";
import { WebSocketContext } from "../modules/ws/WebSocketProvider";
import { Topbar } from "../modules/ui/Topbar";
import { Messages } from "../modules/ui/Messages";

export default function Home() {
  let ws = useContext(WebSocketContext);
  let [loading, setLoading] = useState(true);
  let [currentCommunity, setCommunity] = useState(null);
  let [currentChannel, setChannel] = useState(null);

  useEffect(() => {
    // load plugins and themes etc here
    setLoading(false);
  }, []);

  if (loading) return <p> loading </p>;

  return (
    <>
      <Serverbar
        activeCId={currentCommunity?.id ?? ""}
        setCommunity={setCommunity}
      />
      {currentCommunity && (
        <SecondSidebar c={currentCommunity} setChannel={setChannel} />
      )}
      {currentChannel && <Topbar channel={currentChannel} />}
      {currentChannel && <Messages />}
    </>
  );
}
