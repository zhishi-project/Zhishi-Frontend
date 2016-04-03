import React from 'react'
import AnswerShow from './Show.react'
import QuestionStore from '../../stores/QuestionStore.js'
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
     if (question_id) {
      //  webAPI.processRequest(`/questions/${question_id}/answers`, 'GET', "", (data) => {
      //    AnswerActions.receiveAnswers({question_id: question_id, answers: data })
      //  })
     }
     return {}
   }
 }

class AllAnswers extends React.Component {
  constructor(props, context){
    super(props);
    this.state = getAnswersState(props.question.id)
   }

   componentDidMount(){
     AnswerStore.addChangeListener(this._onChange.bind(this));
     QuestionStore.addChangeListener(this._onChange.bind(this));
   }
   componentWillUnmount(){
     AnswerStore.removeChangeListener(this._onChange).bind(this);
     QuestionStore.removeChangeListener(this._onChange).bind(this);
   }
   _onChange() {
     this.setState(getAnswersState(this.props.question.id), this.initAnswersComponent)
   }

   initAnswersComponent(){
     Prism.highlightAll();
     // tinyMCE.activeEditor.setContent('');
     Common.initTinyMceContent('.answer');
   }

   sortAnswers(answers_obj){
    let answers_arr = [], accepted_answer;
    for (var key in answers_obj) {
      answers_obj[key].accepted 
      ? accepted_answer = answers_obj[key]
      : answers_arr.push(answers_obj[key]);
    }
    answers_arr = answers_arr.sort((current, next) => {
      return current.votes_count - next.votes_count;
    })
    answers_arr.push(accepted_answer);
    return answers_arr;
   }

   render () {
     var answers = [], keys=[];
     let sorted_answers = this.sortAnswers(this.state.answers);
     if (!$.isEmptyObject(sorted_answers)) {
       keys = Object.keys(sorted_answers)
       for (var i = keys.length - 1; i >= 0; i--) {
         answers.push(<AnswerShow key={i} answer={sorted_answers[keys[i]]} question={this.props.question} />)
       }
     }
    //  else if (!this.state.answers) {
    //     answers.push(<i key={0} className="notched circle centered loading icon"></i>)
    //  }
     var ans_statement = keys.length == 1 ? "Answer" : "Answers"
     return (
       <div className="sixteen wide answers column">
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
