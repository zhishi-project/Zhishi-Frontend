import React from 'react'
import ModalEffects from '../mixins/ModalEffects.react'
import TagStore from '../../stores/TagStore'
import TagActions from '../../actions/TagActions'
import webAPI from '../../utils/webAPI'
import _ from 'jquery'

let getTagState = () => {
  let tags = TagStore.getAllTags();
  let selected_tags = TagStore.getSelectedTags();

  if (_.isEmptyObject(tags)) {
    webAPI.processRequest('/tags/recent', 'GET', {}, TagActions.receiveTags);
  }
  return { tags, selected_tags }
}

let index=0, options = [
  'nightlife', 'sports', 'abstract',
  'city', 'people', 'transport',
  'food', 'nature', 'business'
];


class Tag extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const { tag, _onTagClick } = this.props;
    index = (index >= options.length - 1) ? 0 : index + 1
    return (
      <div className={`tag ${tag.status}`} onClick={_onTagClick.bind(this, tag.id)} >
        <div className="overlay">
          <i className="heart icon" data-tag-id={tag.id} />
        </div>
        {/*<img src={`http://lorempixel.com/150/150/${options[index]}`} />*/}
        <img src={`/assets/img/tags/${options[index]}.jpg`} />
        <p className="desc">
          {tag.name}
        </p>
      </div>
    )
  }
}


class TagModal extends React.Component {
  constructor (props) {
    super(props);
    this.state = getTagState();
    this.persistSelection = this.persistSelection.bind(this);
  }

  componentDidMount() {
    const { trigger, mountAsModal, toggleModalShow } = this.props;
    TagStore.addChangeListener(this._onChange.bind(this));
    mountAsModal(this.refs.tagModal, trigger, {closable: false})
    setTimeout( () => {
      toggleModalShow(trigger)
    }, 2000, this)
  }

  componentWillUnmount() {
    TagStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState( getTagState() )
  }

  _onTagClick(tag_id) {
    TagActions.selectTagForSubscription(this.props.tag);
  }

  persistSelection() {
    webAPI.processRequest('/tags/update_subscription', 'POST',
      {tags: this.state.selected_tags}, TagActions.receiveTags);
  }

  render () {
    let view_tags = [], keys = [], valid_count = 3;
    const { tags, selected_tags } = this.state;
    if (!_.isEmptyObject(tags)) {
      keys = Object.keys(tags)
      for (let i=0; i < keys.length; i++) {
        view_tags.push(
          <Tag
            key={i}
            tag={tags[keys[i]] }
            _onTagClick={this._onTagClick}
          />
        )
      }
    }
    index = 0;
    let number_selected = selected_tags.length;
    let selection_valid = number_selected >= valid_count ? "valid" : ""
    let selection_countdown = number_selected < valid_count
      ? `Select ${valid_count - number_selected} more tags`
      :  <a href="#" className="close-modal" onClick={this.persistSelection}>
          Continue
         </a>
    return (
      <div id="selectTagModal" className="md-modal" ref="tagModal">
        <div className="modal-container">
          <div className="header">
            <h4>
              Choose tags that are important to you
            </h4>
            <p>
              So we can make your feed more . . . personal!
            </p>
          </div>
          <div className="main content">
            <div className="ui grid container">
             {view_tags}
            </div>
          </div>

          <div className={`actions ${selection_valid}`}>
            <span className="md-close">{selection_countdown}</span>
          </div>
          <a className={`${this.props.trigger} hidden`} />
        </div>
      </div>
    )
  }
}

export default ModalEffects(TagModal);
