import React, {Component} from 'react';


export default class ProfileTagSection extends Component {
  constructor(props){
    super(props)
  }

  renderButtons(tag, index){
    return (<button className="ui button" key={index}>{tag.name} </button>)
  }

  render(){
   return (<div className="ui card profile-tags">
      <div className="content">
          <div className="column tag-buttons">
            <button className="ui button subscribed">Subscribed tags
            </button>
            <button className={`ui primary button addmore ${this.props.modalTrigger}`}>
              Add more
              </button>
          </div>
        <div className="column tag-buttons">
        {this.props.tags.map(this.renderButtons)}
        </div>
         </div>
        </div>)
  }
}
