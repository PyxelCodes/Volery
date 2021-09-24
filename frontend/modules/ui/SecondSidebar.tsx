import { User } from "../../types/user";
import { CommunityInfo } from "./CommunityInfo";
import { Channels } from "./Channels";

export const SecondSidebar = ({
  c,
  setChannel,
}: {
  c: any;
  setChannel: any;
}) => {
  return (
    <div className="channelbar">
      <CommunityInfo c={c} />
      <Channels channels={c.channels} setChannel={setChannel} />
    </div>
  );
};
