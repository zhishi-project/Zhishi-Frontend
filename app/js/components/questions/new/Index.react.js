import React from 'react';
import * as QuestionActions from '../../../actions/QuestionActions.js';
import NewQuestionPage from './NewQuestionPage.react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

class NewQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: {
        title: '',
        content: '',
        tags: []
      }
    };
  }

   componentDidMount() {
    //  Common.initTinyMceContent('.ask-question');
   }

  //  createQuestion(event) {
  //    event.preventDefault();
  //    $('#submitQuestionBtn').prop( 'disabled', true );
  //    tinymce.triggerSave();
  //    var title = $('form #new_question_title').val();
  //    var desc = $('form #new_question_desc').val();
  //    var tags = [];
  //    $('#selected-tags').children().each(function() { tags.push($(this).html());});
  //    var question_data = {title: title, content: desc, tags: tags};
  //    webAPI('/questions', 'POST', question_data, QuestionActions.createQuestion, $('#submitQuestionBtn'));
  //  }

   onCreateQuestion(event) {
     event.preventDefault();
     const {actions} = this.props;
     actions.updateQuestion({...this.state.question}).then(() => {
       toastr.success('Your question have been successfully updated.');
     }).catch(err => toastr.error(err));
   }

   onUpdateQuestionState(event) {
     const field = this.getQuestionField(event);
     let question = this.state.question;
     question[field] = event.target.getContent();
     this.setState({question});
   }

   getQuestionField(event) {
     return event.target.targetElm.className
       .indexOf('title') === -1 ? 'content' : 'title';
   }

   render() {
     return (
       <NewQuestionPage
         onUpdateQuestionState={this.onUpdateQuestionState}
         onSubmitClick={this.onCreateQuestion} />
     );
   }
 }

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
