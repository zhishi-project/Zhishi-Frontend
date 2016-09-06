import React from 'react';
import * as AnswerActions from '../../actions/AnswerActions.js';
import ShowPage from './ShowPage.react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import $ from 'jquery';

export class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {answer: this.props.answer};
    this.editAnswer = this.editAnswer.bind(this);
    this.acceptAnswer = this.acceptAnswer.bind(this);
    this.updateAnswerState = this.updateAnswerState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({answer: nextProps.answer});
  }

   componentDidMount() {
    //  $('.share-popup').popup();
     new Clipboard('.share-popup');
     $('.share-popup').click(function() {
       window.getSelection().removeAllRanges();
     });
   }

   componentDidUpdate() {
     Prism.highlightAll();
   }

   editAnswer(event) {
     event.preventDefault();
     const {actions} = this.props;
     if (event.target.innerHTML === 'edit') {
       actions.editAnswer(this.state.answer);
     } else {
       actions.updateAnswer({...this.state.answer}).then(() => {
         toastr.success('Your answer have been successfully updated.');
       }).catch(err => toastr.error(err));
     }
   }

   updateAnswerState(event) {
     this.setState({content: event.target.getContent()});
   }

   acceptAnswer() {
     let answer = Object.assign({}, this.state.answer, {accepted: true});
     this.props.actions.acceptAnswer({...answer}).then(() => {
       toastr.success('Thanks for accepting. Others will be better guided to the answer that helped you.');
     }).catch(err => toastr.error(err));
   }

   render() {
     return <ShowPage
               question={this.props.question}
               answer={this.state.answer}
               currentUser={this.props.currentUser}
               updateVote={this.props.actions.loadAnswerVoteSuccess}
               editAnswer={this.editAnswer}
               onChange={this.updateAnswerState}
               acceptAnswer={this.acceptAnswer} />;
   }
 }

/**
* @param {Object} state: from root reducer
* @param {Object} ownProps: for functions
* @return {Object}  {questions, filteredQuestions, page} for homepage
*/
function mapStateToProps(state, ownProps) {
  return {
    answers: state.answers[ownProps.questionId],
    currentUser: state.auth.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AnswerActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Answer);
