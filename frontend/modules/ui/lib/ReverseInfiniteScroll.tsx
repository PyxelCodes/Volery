import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Message } from "../Message";

const Timeline = ({ items, fetch, innerRef, disabled }) => {
  return (
    <div
      id="scrollableDiv"
      style={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column-reverse",
      }}
      ref={innerRef}
    >
      <InfiniteScroll
        dataLength={items.length}
        next={fetch}
        style={{ display: "flex", flexDirection: "column-reverse", height: '100%' }} //To put endMessage and loader to the top.
        inverse={true}
        hasMore={true && !disabled}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
      >
        {items.map((msg, i, arr) => {
          let inline;
          if (i == 0) inline = false;
          if (arr[i - 1]?.author.username == msg.author.username) inline = true;

          return <Message msg={msg} key={`msg-${i}`} inline={inline} />;
        })}
      </InfiniteScroll>
    </div>
  );
};

export default Timeline;
