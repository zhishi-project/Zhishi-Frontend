import React from 'react'
import AnswerShow from './Show.react'
import AnswerStore from '../../stores/AnswerStore.js'
import AnswerActions from '../../actions/AnswerActions.js'
import webAPI from '../../utils/webAPI.js'
import Common from "../../utils/Common"


 function getAnswersState(question_id){
   if (AnswerStore.getAnswers(question_id)) {
     return {
       answers: AnswerStore.getAnswers(question_id)
     }
   } else {
     webAPI.processRequest(`/questions/${question_id}/answers`, 'GET', "", AnswerActions.receiveAnswers)
     return {}
   }
 }

class AllAnswers extends React.Component {
  constructor(props, context){
    super(props)
   }

   componentDidMount(){
     AnswerStore.addChangeListener(this._onChange.bind(this));
   }
   componentWillUnmount(){
     AnswerStore.removeChangeListener(this._onChange).bind(this);
   }
   _onChange() {
     this.setState(getAnswersState(this.props.question_id), this.initAnswersComponent)
   }

   initAnswersComponent(){
     Prism.highlightAll();
     // tinyMCE.activeEditor.setContent('');
     Common.initTinyMceContent();
   }

   render () {
     var answers = [], keys=[];
     if (!$.isEmptyObject(this.props.answers)) {
       keys = Object.keys(this.props.answers)
       for (var i = keys.length - 1; i >= 0; i--) {
         answers.push(<AnswerShow key={i} answer={this.props.answers[keys[i]]} />)
       }
     }
     var ans_statement = keys.length == 1 ? "Answer" : "Answers"
     return (
       <div className="sixteen wide column">
         <div className="ui grid">
           <h4 className="ui dividing full-width answers header">
              <i className="comments outline icon"></i>
              <div className="content">
                {keys.length || "No"} {ans_statement}
              </div>
            </h4>
           {answers}
         </div>
       </div>
     )
   }
 }
 module.exports = AllAnswers;
