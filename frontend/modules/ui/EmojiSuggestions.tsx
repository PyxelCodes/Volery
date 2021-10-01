import emoji from 'node-emoji';

export const EmojiSuggestions = ({ str }) => {
    return null;
  console.log(str);

  let split = str.split(' ');

  let emojiStr = split[split.length - 1];

  if (!emojiStr.startsWith(':')) return null;
  if (emojiStr.length < 3) return null;

  let emojis = emoji.search(emojiStr).reverse();

  if(emojis.length > 10) emojis.length = 10;

  return (
    <div className="autosuggest emojipopout" style={{ height: `${emojis.length * 40}px`}}>
      <div className="suggestheader">
        <h3> Emoji matching: {emojiStr} </h3>
      </div>
      <div className="base">
        {emojis.map((e, i) => {
          return (
            <div className="emoji-row" key={`emoji-${e.key}`}>
              <div className="selectable">
                <div className="autocomplete-content">
                    <div className="autocomplete-icon">
                        { e.emoji }
                    </div>
                    <div className="autocomplete-key">
                        { e.key }
                    </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
