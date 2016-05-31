import React, {Component} from 'react';


export default class ProfileTagSection extends Component {
  constructor(props){
    super(props)
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    $(`.${this.props.modalTrigger}`).click()
  }

  renderButtons(tag, index){
    return (<button className="ui button" key={index}>{tag.name} </button>)
  }

  render(){
    const { user, current_user, modalTrigger } = this.props;
    let addMoreBtn = user.id === current_user.id
    ?   <button onClick={this.toggleModal} className={`ui primary button addmore ${modalTrigger}`}>
          Add more
        </button>
    : ""
   return (
    <div className="ui card profile-tags">
      <div className="content">
          <div className="column tag-buttons">
            <button className="ui button subscribed">Subscribed tags
            </button>
            {addMoreBtn}
          </div>
          <div className="column tag-buttons">
            {this.props.tags.map(this.renderButtons)}
          </div>
       </div>
   </div>)
  }
}
