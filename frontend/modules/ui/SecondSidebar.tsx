import { CommunityInfo } from "./CommunityInfo";
import { Channels } from "./Channels";

export const SecondSidebar = () => {
  return (
    <div className="channelbar">
      <CommunityInfo />
      <Channels />
    </div>
  );
};
