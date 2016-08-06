import React from 'react';
import * as CommentActions from '../../actions/CommentActions.js';
import ShowPage from './ShowPage.react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {comment: props.comment};
    this.editComment = this.editComment.bind(this);
    this.cancelComment = this.cancelComment.bind(this);
  }

   componentDidMount() {
    //  $('.share-popup').popup();
   }

   componentWillReceiveProps(newProps) {
     this.setState({comment: newProps.comment});
   }

   editComment(event) {
     event.preventDefault();
     this.props.actions.editComment(this.retrieveCommentInfo());
   }

   cancelComment(event) {
     event.preventDefault();
     this.props.actions.cancelComment(this.retrieveCommentInfo());
   }

   retrieveCommentInfo() {
     return {meta: this.props.meta, comment: this.state.comment};
   }

   render() {
     return <ShowPage
              comment={this.state.comment}
              meta={this.props.meta}
              editComment={this.editComment}
              actions={this.props.actions}
              updateVote={this.props.actions.updateCommentVoteSuccess}
              currentUser={this.props.currentUser}
              cancelComment={this.cancelComment} />;
   }
 }

 /**
 * @param {Object} state: from root reducer
 * @param {Object} ownProps: for functions
 * @return {Object}  {questions, filteredQuestions, page} for homepage
 */
function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    currentUser: state.currentUser
  };
}

/**
* @param {Func} dispatch: from root reducer
* @return {Object}  actions to be bound
*/
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(CommentActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Comment);
