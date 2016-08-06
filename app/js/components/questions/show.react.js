import React from 'react';
import ShowPage from './ShowPage.react';
import AuthStore from '../../stores/AuthStore.js';
import * as QuestionActions from '../../actions/QuestionActions.js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

function getState(question) {
  return {
    question: Object.assign({}, question)
  };
}

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = getState(props.question);
    this.editQuestion = this.editQuestion.bind(this);
    this.updateQuestionState = this.updateQuestionState.bind(this);
  }

  componentWillMount() {
    const {questionId, actions} = this.props;
    actions.loadQuestion(questionId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.question && nextProps.question.answers) {
      this.setState(getState(nextProps.question));
    } else {
      this.props.actions.loadQuestion(nextProps.questionId);
    }
  }

  componentDidUpdate() {
    Prism.highlightAll();
  }

  editQuestion(event) {
    event.preventDefault();
    const {actions} = this.props;
    if (event.target.innerHTML === 'edit') {
      actions.editQuestion(this.state.question.id);
      toastr.info('You can click on the question title to edit it.');
    } else {
      actions.updateQuestion({...this.state.question}).then(() => {
        toastr.success('Your question have been successfully updated.');
      }).catch(err => toastr.error(err));
    }
  }

  updateQuestionState(event) {
    const field = this.getQuestionField(event);
    let question = this.state.question;
    question[field] = event.target.getContent();
    this.setState({question});
  }

  getQuestionField(event) {
    return event.target.targetElm.className.indexOf('title') === -1 ?
          'content' : 'title';
  }

  render() {
    let question = this.state.question || {};
    let currentUser = AuthStore.getCurrentUser();

    return <ShowPage
            questionId={this.props.questionId}
            question={question}
            updateVote={this.props.actions.updateQuestionVoteSuccess}
            currentUser={currentUser}
            onChange={this.updateQuestionState}
            editQuestion={this.editQuestion} />;
  }
}

/**
* @param {Object} state: from root reducer
* @param {Object} ownProps: for functions
* @return {Object}  {questions, filteredQuestions, page} for homepage
*/
function mapStateToProps(state, ownProps) {
  return {
    question: state.questions.questions[ownProps.questionId]
  };
}

/**
* @param {Func} dispatch: from root reducer
* @return {Object}  actions to be bound
*/
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(QuestionActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Question);
