import React from 'react';
import * as AnswerActions from '../../actions/AnswerActions.js';
import webAPI from '../../utils/webAPI.js';
import AuthStore from '../../stores/AuthStore.js';
import Common from '../../utils/Common';
import ShowPage from './ShowPage.react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

class Answer extends React.Component {
  constructor(props, context) {
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
     $('.share-popup').popup();
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
               currentUser={AuthStore.getCurrentUser()}
               updateVote={this.props.actions.loadAnswerVoteSuccess}
               editAnswer={this.editAnswer}
               onChange={this.updateAnswerState}
               acceptAnswer={this.acceptAnswer} />;
   }
 }
export default Answer;
/**
* @param {Object} state: from root reducer
* @param {Object} ownProps: for functions
* @return {Object}  {questions, filteredQuestions, page} for homepage
*/
function mapStateToProps(state, ownProps) {
  return {
    answers: state.answers[ownProps.questionId]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AnswerActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Answer);
