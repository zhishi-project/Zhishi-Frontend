import React from 'react';
import modalEffects from '../mixins/ModalEffects.react';
import TagStore from '../../stores/TagStore';
import AuthStore from '../../stores/AuthStore';
import TagActions from '../../actions/TagActions';
import AuthActions from '../../actions/AuthActions';
import webAPI from '../../utils/webAPI';
import TagBody from './TagBody.react';
import Auth from '../../auth';

/*
  Tag modal is a State, not behaviour component.
  All modal behaviour is gotten from ModalEffects
  which acts as a Higher Order Component.
*/

const updateSelectedTagsFromUserTags = () => {
  let {tags} = AuthStore.getCurrentUser();
  TagActions.updateBatchTags(tags);
};

/*
  The options array represent types of pictures
  to be gotten from /assets/img/tags
*/

let getTagState = () => {
  let tags = TagStore.getAllTags();
  let selectedTags = TagStore.getSelectedTags();
  return {tags,
    selectedTags,
    index: 0,
    options: [
      'nightlife', 'sports', 'abstract',
      'city', 'people', 'transport',
      'food', 'nature', 'business'
    ]
  };
};

class TagModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = getTagState();
    this.persistSelection = this.persistSelection.bind(this);
  }

  componentWillMount() {

  }

  onTagClick(tag) {
    TagActions.selectTagForSubscription(tag);
  }

  persistSelection(tag) {
    this.props.actions.persistSelection(tag);
  }

  render() {
    return <TagBody
            {...this.state}
            {...this.props}
            onTagClick={this.onTagClick}
            persistSelection={this.persistSelection}/>;
  }
}

export default modalEffects(TagModal);
