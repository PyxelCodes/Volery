import { useContext } from "react";
import { UserStateContext } from "../ws/UserStateProvider";

export const Topbar = () => {
  let { currentChannel: channel } = useContext(UserStateContext);

  return (
    <div className="topbar">
      <h2 style={{color: 'white'}}> {channel.name} </h2>
    </div>
  );
};
