import React from 'react'
import webAPI from '../../utils/webAPI.js'
import AnswerActions from '../../actions/AnswerActions.js'
import Common from "../../utils/Common"

class NewAnswerForm extends React.Component {
  constructor(props, context){
    super(props)
   }

   componentDidMount(){
     Common.initTinyMceContent('.new-answer');
   }

   submitAnswer(event){
     event.preventDefault();
     tinyMCE.triggerSave();
     var answer = $("#answerForm textarea").val();
     var question_id = $("#answerForm textarea").data('question-id');
     webAPI.processRequest(`/questions/${question_id}/answers`, 'POST', { content: answer }, AnswerActions.createAnswer)
     tinyMCE.activeEditor.setContent('');
   }

   render () {
     return (
       <div className="row new-answer">
         <div className="sixteen wide column">
           <h3>Give your own answer</h3>

           <form id="answerForm" className="ui form">
             <div className="field">
               <textarea className="editor-content" data-question-id={this.props.question_id} cols="30" rows="10" value=""></textarea>
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
 module.exports = NewAnswerForm;
