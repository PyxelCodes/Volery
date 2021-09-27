import { useContext, useEffect, useState } from "react";
import { UserStateContext } from "../../ws/UserStateProvider";
import { CategoryChannel } from "./CategoryChannel";
import { TextChannel } from "./TextChannel";

export const Channels = () => {
  let { currentCommunity } = useContext(UserStateContext);

  let { channels } = currentCommunity;

  let nonCategory = channels.filter((x) => !x.parent_id);

  let [sortedChannels, setSortedChannels] = useState(null);

  useEffect(() => {
    if(sortedChannels) return;
    for (let i in channels) {
      let c = channels[i];
      if (c.type == 4) continue;
      if (!c.parent_id) continue;

      let parent = nonCategory.find((x) => x.id == c.parent_id);
      if (!parent.children) parent.children = [];
      parent.children.push(c);
    }

    let sc = nonCategory.sort((a, b) => a.position - b.position);

    sc.forEach((x) => {
      if (!x.children) return;
      x.children = x.children.sort((a, b) => a.position - b.position);
    });

    setSortedChannels(sc);
  }, [setSortedChannels, channels, nonCategory, sortedChannels]);

  if(!sortedChannels) return <p> loading </p>

  return (
    <div className="channels">
      {sortedChannels.map((channel, i) => {
        if (channel.type == 4)
          return (
            <CategoryChannel channel={channel} key={`channel-${i}`}>
              {channel?.children?.map((child, i2) => {
                return (
                  <TextChannel channel={child} key={`category-child-${i2}`} />
                );
              })}
            </CategoryChannel>
          );
        return <TextChannel channel={channel} key={`channel-${i}`} />;
      })}
    </div>
  );
};
