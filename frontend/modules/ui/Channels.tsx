import { CategoryChannel } from "./CategoryChannel";
import { TextChannel } from "./TextChannel";

export const Channels = ({
  channels,
  setChannel,
}: {
  channels: any[];
  setChannel: any;
}) => {
  let nonCategory = channels.filter((x) => !x.parent_id);

  for (let i in channels) {
    let c = channels[i];
    if (c.type == 4) continue;
    if (!c.parent_id) continue;

    let parent = nonCategory.find((x) => x.id == c.parent_id);
    if (!parent.childrens) parent.children = [];
    parent.children.push(c);
  }

  let sortedChannels = nonCategory.sort((a, b) => a.position - b.position);

  sortedChannels.forEach((x) => {
    if (!x.children) return;
    x.children = x.children.sort((a, b) => a.position - b.position);
  });

  console.log(nonCategory);

  return (
    <div className="channels">
      {channels.map((channel, i) => {
        if (channel.type == 4)
          return (
            <CategoryChannel channel={channel} key={`channel-${i}`}>
              {channel.children.map((child, i2) => {
                return (
                  <TextChannel
                    channel={child}
                    key={`category-child-${i2}`}
                    setChannel={setChannel}
                  />
                );
              })}
            </CategoryChannel>
          );
        return (
          <TextChannel
            channel={channel}
            key={`channel-${i}`}
            setChannel={setChannel}
          />
        );
      })}
    </div>
  );
};
