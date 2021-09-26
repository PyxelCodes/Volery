import { useContext, useEffect, useState, useRef } from "react";
import { fetchMessagesFor } from "../../lib/fetchMessagesFor";
import { UserStateContext } from "../ws/UserStateProvider";
import { WebSocketContext } from "../ws/WebSocketProvider";
import Timeline from "./lib/ReverseInfiniteScroll";
import { Message } from "./Message";

export const Messages = () => {
  let {
    currentChannelMessages,
    currentChannel,
    user,
    setCurrentChannelMessages,
  } = useContext(UserStateContext);

  let { conn } = useContext(WebSocketContext);

  let [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const timelineRef = useRef();

  useEffect(() => {
    let onMessageCreate = (msg) => {
      if (msg.author.username == user.username) return;
      setCurrentChannelMessages((old) => [...old, msg]);
    };

    setLoading(true);
    conn.on("MESSAGE_CREATE", onMessageCreate);

    fetchMessagesFor(currentChannel.id).then((x) => {
      setCurrentChannelMessages(x);
      setLoading(false);
    });

    return function cleanup() {
      conn.off("MESSAGE_CREATE", onMessageCreate);
    };
  }, [currentChannel, setCurrentChannelMessages, conn, user]);

  useEffect(() => {
     let doc = document.getElementsByClassName('messages')[0];
     doc.scrollTop = doc.scrollHeight;
  }, [loading])

  return (
    <div className="messages">
      <main className="chat-content">
        <div className="messagesWrapper">
          {loading ? (
            <p> loading </p>
          ) : (
            currentChannelMessages.map((msg, i, arr) => {
              let inline;
              if (i == 0) inline = false;
              if (arr[i - 1]?.author.username == msg.author.username)
                inline = true;

              return <Message msg={msg} key={`msg-${i}`} inline={inline} />;
            })
          )}
        </div>
      </main>
    </div>
  );
};
