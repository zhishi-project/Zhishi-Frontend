import React from 'react';
import ReactMarkdown from 'react-markdown';

const PreviewText = ({text}) => {
  return (
    <div className="preview">
      <h3 className="title">
        Preview
        <span className="desc">
          (Learn <a href="http://commonmark.org/help/">markdown</a>)
        </span>
      </h3>
      <div className="markdown">
        <ReactMarkdown 
          source={text}
          htmlMode='raw' />
      </div>
    </div>
  )
}

export default PreviewText;
