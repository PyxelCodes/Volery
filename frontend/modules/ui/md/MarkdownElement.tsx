import React from "react";
import marked from "marked";

export default class MarkdownElement extends React.Component {
  constructor(props) {
    super(props);

    marked.setOptions({
      gfm: true,
      breaks: false,
      pedantic: false,
      smartLists: false,
      smartypants: false,
    });
  }
  render() {
    const text: any[] = this.props.children as any;

    let html = marked.parseInline(text.join("") || "");

    return (
      <div dangerouslySetInnerHTML={{ __html: html }} className="markdown" />
    );
  }
}
