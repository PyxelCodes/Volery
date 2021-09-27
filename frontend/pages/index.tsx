import { useState, useEffect, useContext } from "react";
import { Serverbar } from "../modules/ui/Serverbar";
import { SecondSidebar } from "../modules/ui/SecondSidebar";
import { Topbar } from "../modules/ui/Topbar";
import { Messages } from "../modules/ui/Messages";
import { UserStateContext } from "../modules/ws/UserStateProvider";
import { TextArea } from "../modules/ui/TextArea";
import { loadThemes } from "../themes/loadThemes";
import { setupPluginApi } from "../plugins/setup";
import { MemberList } from "../modules/ui/MemberList";

export default function Home() {
  let [loading, setLoading] = useState(true);

  let {
    currentChannel,
    currentCommunity,
    communities,
    setCurrentCommunity,
    setCurrentChannel,
  } = useContext(UserStateContext);

  useEffect(() => {
    if (!loading) return;
    // load last channel & community here
    let lastCommunity = localStorage.getItem("last-community");
    let lastChannel = localStorage.getItem("last-channel");

    let c = communities.find((x) => x.id == lastCommunity);

    if (!c) {
      localStorage.removeItem("last-community");
      localStorage.removeItem("last-channel");
    } else {
      setCurrentCommunity(c);
      console.log("found a community last in use, relaunching");
      let ch = c.channels.find((x) => x.id == lastChannel);
      if (!ch) {
        localStorage.removeItem("last-channel");
      } else {
        setCurrentChannel(ch);
        console.log("found a channel last in use, relaunching");
      }
    }

    // load plugins and themes etc here

    loadThemes();

    setupPluginApi();
    
    setLoading(false);
  }, [communities, loading, setCurrentChannel, setCurrentCommunity]);

  if (loading) return <p> loading </p>;

  return (
    <>
      <Serverbar />
      {currentCommunity && <SecondSidebar />}
      {currentChannel && <Topbar />}
      {currentChannel && <Messages />}
      {currentChannel && <MemberList />}
    </>
  );
}
