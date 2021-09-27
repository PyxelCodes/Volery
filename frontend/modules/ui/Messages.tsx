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
  let messageWrapperRef = useRef<HTMLDivElement>(null);

  let [loading, setLoading] = useState(true);

  useEffect(() => {
    let onMessageCreate = msg => {
      if (msg.author.username == user.username) return;
      setCurrentChannelMessages(old => [...old, msg]);
    };

    setLoading(true);
    conn.on('MESSAGE_CREATE', onMessageCreate);

    fetchMessagesFor(currentChannel.id).then(x => {
      setCurrentChannelMessages(x);
      setLoading(false);
    });

    return function cleanup() {
      conn.off('MESSAGE_CREATE', onMessageCreate);
    };
  }, [currentChannel, setCurrentChannelMessages, conn, user]);

  useEffect(() => {
    let doc = document.getElementsByClassName('messages')[0];
    doc.scrollTop = doc.scrollHeight;
  }, [loading]);

  return (
    <div className="center">
      <div className="messages">
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
          <p> loading </p>
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

  scrollToBottom() {
    this.spacerdiv.scrollIntoView({ behavior: 'smooth' });
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }
}
