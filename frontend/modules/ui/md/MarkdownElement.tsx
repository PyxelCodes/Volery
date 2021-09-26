import React, { useEffect } from 'react';
import marked from 'marked';
import hljs from 'highlight.js';

export const MarkdownElement = ({ children }) => {
  marked.setOptions({
    renderer: new marked.Renderer(),
    langPrefix: 'hljs language-',
    highlight: (code, lang) => {
      if (hljs.getLanguage(lang)) {
        return hljs.highlight(lang, code).value;
      } else {
        return hljs.highlightAuto(code).value;
      }
    },
    xhtml: false,
    gfm: true,
    breaks: false,
    pedantic: false,
    smartLists: false,
    smartypants: false,
  });

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  let html = marked(children.join('') || '');

  return (
    <div dangerouslySetInnerHTML={{ __html: html }} className="markdown" />
  );
};
