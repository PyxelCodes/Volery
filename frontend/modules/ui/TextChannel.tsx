import { useContext } from "react";
import { fetchMessagesFor } from "../../lib/fetchMessagesFor";
import { UserStateContext } from "../ws/UserStateProvider";

export const TextChannel = ({ channel }) => {

  let { setCurrentChannel } = useContext(UserStateContext);

  let clickManager = () => {
    setCurrentChannel(channel);
  };
  return (
    <div className="channel">
      <div className="marker" />
      <div className="content">
        <div className="linkmanager" onClick={clickManager}>
          <span className="icon" />
          <div className="name">{channel.name}</div>
        </div>
      </div>
    </div>
  );
};
