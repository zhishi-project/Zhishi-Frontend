import React from 'react';
import modalEffects from '../../mixins/ModalEffects.react';
import * as TagActions from '../../../actions/TagActions';
import TagBody from './TagBody.react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

/*
  Tag modal is a State, not behaviour component.
  All modal behaviour is gotten from ModalEffects
  which acts as a Higher Order Component.
*/

/*
  The options array represent types of pictures
  to be gotten from /assets/img/tags
*/

let getInitialTagState = () => {
  return {
    options: {modalId: 'modal-id'},
    TagThumbnails: [
      'nightlife', 'sports', 'abstract',
      'city', 'people', 'transport',
      'food', 'nature', 'business'
    ]
  };
};

export class TagModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = getInitialTagState();
    this.onTagClick = this.onTagClick.bind(this);
    this.submitSelectedTags = this.submitSelectedTags.bind(this);
  }

  componentWillMount() {
    this.props.actions.loadTags();
  }

  onTagClick(tag) {
    this.props.actions.selectTagForSubscription(tag);
  }

  submitSelectedTags() {
    const {actions, selectedTags} = this.props;
    actions.subscribeToTags(selectedTags);
  }

  render() {
    return <TagBody
            {...this.props}
            {...this.state}
            onTagClick={this.onTagClick}
            persistSelection={this.submitSelectedTags} />;
  }
}

/**
* @param {Object} state: from root reducer
* @param {Object} ownProps: for functions
* @return {Object}  {questions, filteredQuestions, page} for homepage
*/
function mapStateToProps(state) {
  return {
    tags: state.tags.tags,
    selectedTags: state.tags.selectedTags
  };
}

/**
* @param {Func} dispatch: from root reducer
* @return {Object}  actions to be bound
*/
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TagActions, dispatch)
  };
}

export default connect(mapStateToProps,
  mapDispatchToProps)(modalEffects(TagModal));
