import React from 'react'

const Tag = () => {
  let options = ['nightlife', 'sports', 'abstract', 'city', 'people', 'transport', 'food', 'nature', 'business']
  return (
    <div className="tag">
      <div className="overlay">
        <i className="heart icon"></i>
      </div>

      <img src={`http://lorempixel.com/200/200/${options[parseInt(Math.random() * options.length)]}`} />
      <p className="desc">
        Lorem
      </p>
    </div>
  )
}
class Modal extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    var tags = [];
    for (var i=0;i < 30; i++) {
      tags.push(<Tag />)
    }
    return (
      <div className="ui modal">
        <div className="header">
          <h4>
            Select at least three tags
          </h4>
          <p>
            Let us personalize your feed
          </p>
        </div>
        <div className="main content">
          <div className="ui grid container">
           {tags}
          </div>
        </div>
        
        <div className="actions">
          <a href="#" disabled>
            Select 3 more tags
          </a>
        </div>
      </div>
    )
  }
}

export default Modal;