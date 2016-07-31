import React from 'react'
import ModalEffects from '../mixins/ModalEffects.react'
import TagStore from '../../stores/TagStore'
import AuthStore from '../../stores/AuthStore'
import TagActions from '../../actions/TagActions'
import AuthActions from '../../actions/AuthActions'
import webAPI from '../../utils/webAPI'
import _ from 'jquery'

/*
  Tag modal is a State, not behaviour component.
  All modal behaviour is gotten from ModalEffects
  which acts as a Higher Order Component.
*/

const updateSelectedTagsFromUserTags = () => {
  let { tags } = AuthStore.getCurrentUser();
  TagActions.updateBatchTags(tags)
}

let getTagState = () => {
  let tags = TagStore.getAllTags();
  let selected_tags = TagStore.getSelectedTags();
  return { tags, selected_tags }
}

/*
  The options array represent types of pictures
  to be gotten from /assets/img/tags
*/

let index=0, options = [
  'nightlife', 'sports', 'abstract',
  'city', 'people', 'transport',
  'food', 'nature', 'business'
];


const Tag = ({ tag, selectedStatus, onTagClick}) => {
  index = (index >= options.length - 1) ? 0 : index + 1
  return (
    <div className={`tag ${selectedStatus}`} onClick={onTagClick.bind(this, tag)} >
      <div className="overlay">
        <i className="heart icon" data-tag-id={tag.id} />
      </div>
      <img src={`/assets/img/tags/${options[index]}.jpg`} />
      <p className="desc">
        {tag.name}
      </p>
    </div>
  )
}


class TagModal extends React.Component {
  constructor (props) {
    super(props);
    this.state = getTagState();
    this.persistSelection = this.persistSelection.bind(this);
  }

  componentWillMount() {
    if (!TagStore.tagsLoaded()) {
      webAPI('/tags/recent', 'GET', {}, (tags)=>{
        TagActions.receiveTags(tags);
      });
    }
    updateSelectedTagsFromUserTags();
  }

  componentDidMount() {
    TagStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    TagStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState( getTagState() )
  }

  onTagClick(tag) {
    TagActions.selectTagForSubscription(tag);
  }

  persistSelection() {
    webAPI('/tags/update_subscription', 'POST',
      {tags: this.state.selected_tags}, (data) => {
        if (data.tags) {
          let current_user = AuthStore.getCurrentUser()
          data.tags.map(tag => { tag['status'] = 'selected' })
          current_user['tags'] = data.tags
          AuthActions.updateCurrentUser(current_user)
        }
      });
  }

  render () {
    let view_tags = [], keys = [], valid_count = 3, selectedStatus;
    const { tags, selected_tags } = this.state;

    if (!_.isEmptyObject(tags)) {
      keys = Object.keys(tags)
      for (let i=0; i < keys.length; i++) {
        selectedStatus = (selected_tags.indexOf(tags[keys[i]].name) === -1) ? '' : 'selected'
        view_tags.push(
          <Tag
            key={i}
            tag={tags[keys[i]] }
            selectedStatus={selectedStatus}
            onTagClick={this.onTagClick}
          />
        )
      }
    }

    index = 0; // The index for the picture array
    let number_selected = selected_tags.length;
    let selection_valid = number_selected >= valid_count ? "valid" : ""
    let selection_countdown = number_selected < valid_count
      ? `Select ${valid_count - number_selected} more categories`
      :  <a href="#" className="md-close" onClick={this.persistSelection}>
          Continue
         </a>

   let { options } = this.props;
    return (
      <div id="selectTagModal" className="md-modal" ref="tagModal">
        <div className="modal-container">
          <div className="header">
            <h4>
              Choose categories that are important to you
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
            {selection_countdown}
          </div>
          <a className={`${options.modalId}-trigger hidden`} />
        </div>
      </div>
    )
  }
}

export default ModalEffects(TagModal);
