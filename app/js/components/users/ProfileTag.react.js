import React, {Component} from 'react';


export default class ProfileTagSection extends Component {
  constructor(props){
    super(props)
  }

  renderButtons(tagName, index){
    return (<button className="ui button" key={index}>{tagName} </button>)

  }

  render(){
   return (<div className="ui card profile-tags">
      <div className="content">
          <div className="column tag-buttons">
            <button className="ui button subscribed">Subscribed tags
            </button>
            <button className="ui primary button addmore">
              Add more
              </button>
          </div>
        <div className="column tag-buttons">
        {['amity', 'food', 'programming', 'success', 'shower'].map(this.renderButtons)}
        </div>
         </div>
        </div>)
  }
}
