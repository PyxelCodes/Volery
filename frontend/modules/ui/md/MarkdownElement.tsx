import React, { useEffect } from 'react';
import marked, { Renderer } from 'marked';
import hljs from 'highlight.js';
import { nanoid } from 'nanoid';
import { emojify } from 'node-emoji';
class Tokenizer extends marked.Tokenizer {
  constructor() {
    super();
  }
  blockquote() {
    return void 0;
  }
  hr() {
    return void 0;
  }
  heading() {
    return void 0;
  }
  list() {
    return void 0;
  }
  br() {
    return void 0;
  }
  table() {
    return void 0;
  }

  paragraph() {
    return void 0;
  }
}

let tokenizer = new Tokenizer();
let renderer = new Renderer();
(function () {
  let anchorRender = {
    options: {
      sanitize: true,
    },
    render: marked.Renderer.prototype.link,
  };
  renderer.link = function (href, title, text) {
    //@ts-ignore
    var anchor = anchorRender.render(href, title, text);
    return anchor.replace('<a', "<a target='_blank' ");
  };
})();
marked.setOptions({
  //@ts-ignore
  renderer,
  langPrefix: 'hljs language-',
  highlight: (code, lang) => {
    if (hljs.getLanguage(lang)) {
      return hljs.highlight(lang, code).value;
    } else {
      return hljs.highlightAuto(code).value;
    }
  },
  xhtml: false,
  tokenizer,
  gfm: true,
  breaks: false,
  pedantic: false,
  smartLists: false,
  smartypants: false,
  headerIds: false,
  silent: process.env.NODE_ENV == 'production',
});

export const MarkdownElement = ({ text }) => {
  let id = nanoid(20);

  let html = marked(emojify(text || ''));

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className="markdown"
      id={`md-${id}`}
    />
  );
};
