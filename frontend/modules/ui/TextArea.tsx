import { Formik } from "formik";
import { nanoid } from "nanoid";
import { useContext, useRef, useEffect, useState } from "react";
import { createMessage } from "../../lib/createMessage";
import { UserStateContext } from "../ws/UserStateProvider";
import { useScreenType } from "./hooks/useScreenType";
import { Input } from "./Input";

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

  let [message, setMessage] = useState("");

  useEffect(() => {
    if (screenType !== "fullscreen") inputRef.current?.focus(); // Prevent autofocus on mobile
  }, [screenType]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (!user) return;

    if (
      !message ||
      !message.trim() ||
      !message.replace(/[\u200B-\u200D\uFEFF]/g, "")
    ) {
      return;
    }

    setMessage("");

    let nonce = nanoid(30);

    let l = currentChannelMessages.length;

    setCurrentChannelMessages((old) => [
      ...old,
      {
        author: user,
        pending: true,
        content: message,
        nonce,
      },
    ]);

    createMessage(message, context, nonce).then((msg) => {
        let doc = document.getElementsByClassName('messages')[0]
        doc.scrollTop = doc.scrollHeight;
    });
  };

  return (
    <div className="textarea">
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            maxLength={2000}
            placeholder={`Message #${currentChannel.name}`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            transparent
            ref={inputRef}
            autoComplete="off"
          />
        </div>
      </form>
    </div>
  );
};
