import { useContext } from 'react';
import { UserPopoutContext } from '../ws/UserPopoutContext';
import { MarkdownElement } from './md/MarkdownElement';

export const Message = ({ msg, inline }) => {
  let d = new Date(msg.created_at);

  let dateString = `${d.toLocaleString()}`;

  let { isOpen, setIsOpen, setId } = useContext(UserPopoutContext);

  return (
    <li
      id={`message-${msg.id}`}
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
                  <span className="displayName" onClick={() => { setIsOpen(!isOpen); setId(msg.author.id); }}>
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
          <div className={`content ${msg.pending ? 'pending' : ''}`}>
            <MarkdownElement text={msg.content} />
          </div>
        </div>
      </div>
    </li>
  );
};
