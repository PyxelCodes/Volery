import { CommunityInfo } from "./community/CommunityInfo";
import { Channels } from "./channel/Channels";

export const SecondSidebar = () => {
  return (
    <div className="channelbar">
      <CommunityInfo />
      <Channels />
    </div>
  );
};
