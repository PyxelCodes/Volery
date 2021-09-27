import React, { useEffect } from 'react';
import marked from 'marked';
import hljs from 'highlight.js';
import { nanoid } from 'nanoid';

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }

export const MarkdownElement = ({ children }) => {
  let id = nanoid(20);
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

  let html = marked(children.join('') || '');

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className="markdown"
      id={`md-${id}`}
    />
  );
};
