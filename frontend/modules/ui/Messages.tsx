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

  useEffect(() => {
    // scroll listener
    let onScroll = () => {
      //! infinteScroll here !!!
    };
    scrollDiv.current.addEventListener('scroll', onScroll);
    return () => {
      scrollDiv?.current?.removeEventListener('scroll', onScroll); // eslint-ignore-line
    };
  }, [scrollDiv]);

  useEffect(() => {
    let onMessageCreate = msg => {
      msgs.dispatch({ type: 'add_c_message', cid: currentChannel.id, msg })
      if (currentChannel.id !== msg.channel_id) return;
      setMessages(o => [...o, msg]);
    };

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
