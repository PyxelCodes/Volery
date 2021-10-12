import { useContext, useEffect, useState, useRef, Component } from 'react';
import { fetchMessagesFor } from '../../lib/fetchMessagesFor';
import msgs from '../stores/messages';
import { UserStateContext } from '../ws/UserStateProvider';
import { WebSocketContext } from '../ws/WebSocketProvider';
import { Message } from './Message';
import { TextArea } from './TextArea';

export const Messages = () => {
  let { currentChannel, user } = useContext(UserStateContext);

  let [messages, setMessages] = useState(null);

  let { conn } = useContext(WebSocketContext);

  let scrollDiv = useRef(null);

  let [loading, setLoading] = useState(true);

  let [isReq, setIsReq] = useState(false);

  useEffect(() => {
    // scroll listener

    let onScroll = (e) => {
      let sTop = e.target.scrollTop;

      if(sTop < 60) {
        setIsReq(true)
     //   fetchMessagesFor(currentChannel.id, { before: messages?.[0].id })
      }
    };

    scrollDiv.current.addEventListener('scroll', onScroll);
    return () => {
      scrollDiv?.current?.removeEventListener('scroll', onScroll); // eslint-ignore-line
    };
  }, [scrollDiv]);

  useEffect(() => {
    let onMessageCreate = msg => {
      let s = msgs.getState();

      if (s[currentChannel.id].find(x => x.nonce == msg.nonce)) {
        msgs.dispatch({
          type: 'set_message',
          msg,
        });
      } else {
        msgs.dispatch({ type: 'add_message', cid: currentChannel.id, msg });
      }

      if (currentChannel.id !== msg.channel_id) return;
    };

    msgs.subscribe(() => {
      let state = msgs.getState()[currentChannel.id];

      setMessages(o => {
        return [...state];
      });
    });

    setLoading(true);
    conn.on('MESSAGE_CREATE', onMessageCreate);

    fetchMessagesFor(currentChannel.id).then(x => {
      setMessages(x);
      setLoading(false);
    });

    return function cleanup() {
      conn.off('MESSAGE_CREATE', onMessageCreate);
    };
  }, [currentChannel, conn, user]); // eslint-ignore-line

  return (
    <div className="center">
      <div className="messages" ref={scrollDiv}>
        <main className="chat-content">
          {loading ? (
            <p> loading messages </p>
          ) : (
            <>
              {messages.length == 0 ? (
                <h2> wow such empty </h2>
              ) : (
                <MessageMap
                  currentChannelMessages={messages}
                  loading={loading}
                />
              )}
            </>
          )}
        </main>
      </div>
      <TextArea />
    </div>
  );
};

export class MessageMap extends Component<
  { loading; currentChannelMessages },
  {}
> {
  constructor(props) {
    super(props);
  }
  public spacerdiv;
  render() {
    return (
      <div className="messagesWrapper">
        {this.props.loading ? (
          <p>Loading</p>
        ) : (
          this.props.currentChannelMessages.map((msg, i, arr) => {
            let inline;
            if (i == 0) inline = false;
            if (arr[i - 1]?.author.username == msg.author.username)
              inline = true;

            let Date1 = new Date(arr[i - 1]?.created_at);
            let Date2 = new Date(msg?.created_at);

            if ((Date2.getTime() - Date1.getTime()) > 2 * 1000 * 60)
              inline = false;

            return <Message msg={msg} key={`msg-${i}`} inline={inline} />;
          })
        )}
        <div
          className="dummydiv scrollerspacer"
          ref={el => {
            this.spacerdiv = el;
          }}
        ></div>
      </div>
    );
  }

  scrollToBottom(...args) {
    this.spacerdiv.scrollIntoView(...args);
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }
}
