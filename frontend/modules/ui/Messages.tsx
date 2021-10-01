import { useContext, useEffect, useState, useRef, Component } from 'react';
import { fetchMessagesFor } from '../../lib/fetchMessagesFor';
import { UserStateContext } from '../ws/UserStateProvider';
import { WebSocketContext } from '../ws/WebSocketProvider';
import { Message } from './Message';
import { TextArea } from './TextArea';

export const Messages = () => {
  let {
    currentChannelMessages,
    currentChannel,
    user,
    setCurrentChannelMessages,
  } = useContext(UserStateContext);

  let { conn } = useContext(WebSocketContext);

  let scrollDiv = useRef(null)

  let [loading, setLoading] = useState(true);

  useEffect(() => { // scroll listener
    let onScroll = () => {
      console.log(scrollDiv.current.scrollTop)
    }
    scrollDiv.current.addEventListener('scroll', onScroll);
    return () => {
      console.log(scrollDiv.current)
      scrollDiv.current.removeEventListener('scroll', onScroll)
    }
  }, [scrollDiv])

  useEffect(() => {
    let onMessageCreate = msg => {
      if (msg.author.username == user.username) return;
      if (currentChannel.id !== msg.channel_id) return;
      setCurrentChannelMessages(old => [...old, msg]);
    };

    setLoading(true);
    conn.on('MESSAGE_CREATE', onMessageCreate);

    fetchMessagesFor(currentChannel.id).then(x => {
      setCurrentChannelMessages(x);
      console.log(
        `%c[MessageManager]`,
        'color: purple;',
        `fetched messages for ${currentChannel.id}`
      );
      setLoading(false);
    });

    return function cleanup() {
      conn.off('MESSAGE_CREATE', onMessageCreate);
    };
  }, [currentChannel, setCurrentChannelMessages, conn, user]);

  return (
    <div className="center">
      <div className="messages" ref={scrollDiv}>
        <main className="chat-content">
          <MessageMap
            currentChannelMessages={currentChannelMessages}
            loading={loading}
          />
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
