import { useRef, useState } from 'react';
import { DeveloperInputBox } from '../../../modules/developers/InputBox';
import { DeveloperSidebar } from '../../../modules/developers/Sidebar';

export default function NewTheme({ misc }) {
  let ref = useRef(null);

  let [styleTag, setStyleTag] = useState<HTMLStyleElement>(null);

  let onIFrameLoad = () => {
    console.log('Dev IFrame has loaded');
    let IFrame = (document.getElementById('dev-iframe') as HTMLIFrameElement)
      .contentDocument;

    let style = IFrame.createElement('style');

    // @ts-ignore
    if (style.styleSheet) {
      // This is required for IE8 and below.
      // @ts-ignore
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(IFrame.createTextNode(''));
    }

    IFrame.head.appendChild(style);
    setStyleTag(style);
  };

  return (
    <div className="dev-wrapper">
      <DeveloperSidebar misc={misc} />
      <main
        style={{
          left: '300px',
          width: 'calc(100% - 300px)',
          position: 'absolute',
          top: 0,
          padding: '20px',
          overflowY: 'scroll',
          height: '100%',
        }}
      >
        <h2> Create Theme </h2>
        <DeveloperInputBox
          title="Name"
          desc="The name of your beautiful Theme"
          footer="Please use 32 characters at maximum."
          maxLength={32}
        />
        <DeveloperInputBox
          title="Author"
          desc="The creator(s) of the Theme"
          maxLength={128}
          footer="Please use 128 characters at maximum."
        />

        <textarea
          onChange={x => {
            let css = x.target.value;

            styleTag.innerHTML = '' 
            styleTag.appendChild(document.createTextNode(css))

          }}
        />

        <div className="dev-iframe-wrapper">
          <div className="header">
            <h2> Dev View </h2>
          </div>
          <iframe
            src="/"
            id="dev-iframe"
            ref={ref}
            onLoad={onIFrameLoad}
          ></iframe>
        </div>
      </main>
    </div>
  );
}
