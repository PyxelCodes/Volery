import { Formik } from 'formik';
import { nanoid } from 'nanoid';
import { useContext, useRef, useEffect, useState, Component } from 'react';
import { createMessage } from '../../lib/createMessage';
import { UserStateContext } from '../ws/UserStateProvider';
import { useScreenType } from './hooks/useScreenType';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';

export const TextArea = () => {
  let context = useContext(UserStateContext);
  let { currentChannel, user, setCurrentChannelMessages } = context;

  const handleSubmit = async () => {
    //@ts-ignore
    let message = document.getElementsByClassName('e-input')[0].value;
    if (!user) return;

    if (
      !message ||
      !message.trim() ||
      !message.replace(/[\u200B-\u200D\uFEFF]/g, '')
    ) {
      return;
    }
    //ts-ignore
    (document.getElementsByClassName('e-input')[0] as HTMLInputElement).value =
      ''; //ts-ignore
    (document.getElementsByClassName(
      'e-input'
    )[0] as HTMLInputElement).style.height = '30px'; //ts-ignore
    (document.getElementsByClassName(
      'textinput'
    )[0] as HTMLInputElement).style.height = '40px'; //ts-ignore

    let nonce = nanoid(30);

    setCurrentChannelMessages(old => [
      ...old,
      {
        author: user,
        pending: true,
        content: message.trim(),
        created_at: Date.now(),
        nonce,
      },
    ]);

    createMessage(message, context, nonce).then(msg => {
      // messageWrapperRef.current.scrollIntoView();
    });
  };

  return (
    <div className="textarea">
      <div className="textinput">
        <form onSubmit={handleSubmit}>
          <TextInput
            channelName={currentChannel.name}
            onSubmit={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
};

class TextInput extends Component<
  { channelName: string; onSubmit: Function },
  {}
> {
  channelName: string;
  props: any;
  constructor(props) {
    super(props);
    this.channelName = props.channelName;
    this.props = props;
  }
  public textareaObj: any;
  public container: any;
  public render() {
    return (
      <TextBoxComponent
        multiline
        input={(this.onInput = this.onInput.bind(this))}
        created={(this.onCreate = this.onCreate.bind(this))}
        ref={scope => {
          this.textareaObj = scope;
        }}
        placeholder={`Message #${this.channelName}`}
      />
    );
  }

  private onCreate(): void {
    this.textareaObj.addAttributes({ rows: 1 });
    this.textareaObj.respectiveElement.onkeydown = evt => {
      if (evt.key == 'Enter' && !evt.shiftKey) {
        evt.preventDefault();
        this.props.onSubmit();
      }
    };
    this.textareaObj.respectiveElement.style.height = 'auto';
    this.textareaObj.respectiveElement.style.height =
      this.textareaObj.respectiveElement.scrollHeight + 'px';
    this.container = document.getElementsByClassName('textinput')[0];
  }
  private onInput(): void {
    let lines = this.textareaObj.respectiveElement.value.split('\n').length;
    this.textareaObj.respectiveElement.style.height = `${
      30 + (lines - 1) * 22
    }px`;
    this.container.style.height = `${40 + (lines - 1) * 22}px`;
  }
}
