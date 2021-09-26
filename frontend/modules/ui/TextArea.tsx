import { Formik } from 'formik';
import { nanoid } from 'nanoid';
import { useContext, useRef, useEffect, useState } from 'react';
import { createMessage } from '../../lib/createMessage';
import { UserStateContext } from '../ws/UserStateProvider';
import { useScreenType } from './hooks/useScreenType';
import { Input } from './Input';

export const TextArea = () => {
  let context = useContext(UserStateContext);
  let {
    currentChannel,
    user,
    setCurrentChannelMessages,
    currentChannelMessages,
  } = context;

  const inputRef = useRef<HTMLInputElement>(null);
  const screenType = useScreenType();

  useEffect(() => {
    if (screenType !== 'fullscreen') inputRef.current?.focus(); // Prevent autofocus on mobile
  }, [screenType]);

  const handleSubmit = async () => {
    let message = document.getElementById('textinput').innerText;
    console.log(message)
    console.log('onmsg', user, !user);
    if (!user) return;

    if (
      !message ||
      !message.trim() ||
      !message.replace(/[\u200B-\u200D\uFEFF]/g, '')
    ) {
      return;
    }

    document.getElementById('textinput').innerText = '';

    let nonce = nanoid(30);

    setCurrentChannelMessages(old => [
      ...old,
      {
        author: user,
        pending: true,
        content: message.trim(),
        nonce,
      },
    ]);

    createMessage(message, context, nonce).then(msg => {
      let doc = document.getElementsByClassName('messages')[0];
      doc.scrollTop = doc.scrollHeight;
    });
  };

  return (
    <div className="textarea">
      <form onSubmit={handleSubmit}>
        <div>
          <div
            id="textinput"
            contentEditable="true"
            onKeyDown={evt => {
              if (
                evt.code == 'Enter' &&
                !evt.altKey &&
                !evt.shiftKey &&
                !evt.ctrlKey
              ) {
                evt.preventDefault();
                handleSubmit();
              }
            }}
          ></div>
        </div>
      </form>
    </div>
  );
};
