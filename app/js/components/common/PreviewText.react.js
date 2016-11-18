import React from 'react';
import ReactMarkdown from 'react-markdown';

class PreviewText extends React.Component {
  componentDidUpdate() {
    Prism.highlightAll(); // eslint-disable-line no-undef
  }
  render() { 
    return (
      <div className="preview">
        <div className="desc">
          (Learn <a href="http://commonmark.org/help/">markdown</a>)
        </div>
        <div className="markdown">
          <ReactMarkdown 
            source={this.props.text}
            htmlMode='raw' />
        </div>
      </div>
    )
  }
}

export default PreviewText;
