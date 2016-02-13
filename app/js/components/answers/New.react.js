import React from 'react'
import webAPI from '../../utils/webAPI.js'
import QuestionActions from '../../actions/QuestionActions.js'
import Mixins from "../../utils/mixins"

class NewQuestionForm extends React.Component {
  constructor(props, context){
    super(props)
   }

   componentDidMount(){
     Mixins.initTinyMce();
   }

   submitAnswer(event){
     event.preventDefault();
     tinyMCE.triggerSave();
     var answer = $("#answerForm textarea").val();
     var question_id = $("#answerForm textarea").data('question-id');
     webAPI.processRequest(`/questions/${question_id}/answers`, 'POST', { content: answer }, QuestionActions.receiveQuestionAnswer)
   }

   render () {
     return (
       <div className="row new-answer">
         <div className="sixteen wide column">
           <h3>Give your own answer</h3>

           <form id="answerForm" className="ui form">
             <div className="field">
               <textarea className="editor-instance" data-question-id={this.props.question_id} cols="30" rows="10" value=""></textarea>
             </div>
             <button className="ui button" onClick={this.submitAnswer}>
               Post Answer
             </button>
           </form>
         </div>
       </div>
     )
   }
 }
 module.exports = NewQuestionForm;
