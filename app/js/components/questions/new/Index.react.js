import React, {PropTypes} from 'react';
import * as QuestionActions from '../../../actions/QuestionActions.js';
import NewQuestionPage from './NewQuestionPage.react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import toastr from 'toastr';

class NewQuestion extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      question: {
        title: '',
        content: '',
        tags: []
      }
    };
    this.onCreateQuestion = this.onCreateQuestion.bind(this);
    this.onUpdateQuestionState = this.onUpdateQuestionState.bind(this);
    this.redirect = this.redirect.bind(this);
    this.onUpdateTags = this.onUpdateTags.bind(this);
  }

   onCreateQuestion(event) {
     event.preventDefault();
     const {actions} = this.props;
     actions.createQuestion(this.state.question)
     .then(question => this.redirect(question))
     .catch(err => toastr.error(err));
   }

   redirect(question) {
     toastr.success('Your question have been successfully updated.');
     this.props.history.push(`/questions/${question.id}`);
   }

   onUpdateQuestionState(key, content) {
     let question = this.state.question;
     question[key] = content;
     this.setState({question});
   }

   onUpdateTags(tags) {
     let question = this.state.question;
     question.tags = tags;
     this.setState({question});
   }

   render() {
     return <NewQuestionPage
              question={this.state.question}
              onUpdateQuestionState={this.onUpdateQuestionState}
              onUpdateTags={this.onUpdateTags}
              onSubmitClick={this.onCreateQuestion} />
   }
 }

NewQuestion.contextTypes = {
  history: React.PropTypes.object.isRequired
};

/**
* @param {Object} state: from root reducer
* @param {Object} ownProps: for functions
* @return {Object}  {questions, filteredQuestions, page} for homepage
*/
function mapStateToProps() {
  return {};
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

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion);
