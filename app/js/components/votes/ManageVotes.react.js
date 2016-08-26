import React from 'react';
import * as VoteActions from '../../actions/VoteActions.js';
import AuthStore from '../../stores/AuthStore.js';
import Votes from './Votes.react';
import CommentVotes from './CommentVotes.react';
import toastr from 'toastr';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import assign from 'object-assign';

let voteState = resource => {
  return {
    resource,
    voteInfoToDisplay: '',
    currentUser: AuthStore.getCurrentUser()
  };
};

class ManageVotes extends React.Component {
 constructor(props) {
   super(props);
   this.vote = this.vote.bind(this);
   this.upvote = this.upvote.bind(this);
   this.downvote = this.downvote.bind(this);
   this.upvoted = this.upvoted.bind(this);
   this.downvoted = this.downvoted.bind(this);
   this.voteSuccess = this.voteSuccess.bind(this);
   this.onCloseMessage = this.onCloseMessage.bind(this);
   this.state = voteState(this.props.resource);
 }

  eligibleToVote() {
    return (this.state.auth.currentUser.points > 14);
  }

  notEnoughPointsToVote() {
    this.setState({VoteInfoToDisplay: 'lackingPoints'});
  }

  upvote(event) {
    if (this.eligibleToVote()) return this.vote(event, 'up');
    this.notEnoughPointsToVote();
  }

  downvote(event) {
    if (this.eligibleToVote()) return this.vote(event, 'down');
    this.notEnoughPointsToVote();
  }

  upvoted() {
    return this.props.resource.user_vote === 1 ? 'active' : '';
  }

  downvoted() {
    return this.props.resource.user_vote === -1 ? 'active' : '';
  }

  onCloseMessage() {
    this.setState({voteInfoToDisplay: false});
  }

  vote(event, action) {
    const args = assign({}, this.props, {action});
    this.props.actions.updateVote({...args})
    .then(data => this.voteSuccess(data, action))
    .catch(err => this.voteError(err, action));
  }

  voteSuccess(data, action) {
    if (data.errors) return this.voteError(data.errors, action);
    if (this.state.resource.votes_count === data.response) {
      return this.setState({voteInfoToDisplay: 'equalValue'});
    }
    this.setState({resource: this.props.resource});
    toastr.success(`The ${
      this.props.meta.owner} has been ${action}voted successfully`);
  }

  voteError(err, action) {
    toastr.error(`Awwww... the ${
      this.props.meta.owner} wasn't ${action}voted. ${err}`);
  }

  render() {
    return this.props.meta.owner === 'comment' ?
      <CommentVotes
        resource={this.state.resource}
        upvote={this.upvote} /> :
      <Votes
        resource={this.state.resource}
        voteInfoToDisplay={this.state.voteInfoToDisplay}
        upvote={this.upvote}
        downvote={this.downvote}
        upvoted={this.upvoted}
        downvoted={this.downvoted}
        onCloseMessage={this.onCloseMessage} />;
  }
}

/**
* @param {Object} state: from root reducer
* @param {Object} ownProps: for functions
* @return {Object}  {questions, filteredQuestions, page} for homepage
*/
function mapStateToProps(state, ownProps) {
  return {...ownProps};
}

/**
* @param {Func} dispatch: from root reducer
* @return {Object}  actions to be bound
*/
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(VoteActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageVotes);
