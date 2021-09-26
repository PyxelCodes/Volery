import { MarkdownElement } from './md/MarkdownElement';

export const Message = ({ msg, inline }) => {
  let d = new Date(msg.created_at);

  let dateString = `${d.toLocaleString()}`;

  return (
    <li
      id={`message-${msg.id}`}
      onMouseEnter={() =>
        document
          .getElementById(`message-${msg.id}`)
          .classList.add('message-hover')
      }
      onMouseLeave={() =>
        document
          .getElementById(`message-${msg.id}`)
          .classList.remove('message-hover')
      }
    >
      <div className={`message ${inline ? 'inline' : ''}`}>
        <div className="contents">
          {!inline && (
            <>
              <img
                src={msg.author.avatar}
                aria-hidden="true"
                className="avatar"
                alt=" "
              />
              <h2 className="header">
                <span className="headerText">
                  <span className="displayName">
                    {msg.author.displayName ?? msg.author.username}
                  </span>
                </span>
                <span className="additionalHeaderText">
                  <span className="username">
                    @{msg.author.username} &bull;
                  </span>
                  <time dateTime={msg.created_at}>{dateString}</time>
                </span>
              </h2>
            </>
          )}
          <div className="content">
            <MarkdownElement> {msg.content} </MarkdownElement>
          </div>
        </div>
      </div>
    </li>
  );
};
