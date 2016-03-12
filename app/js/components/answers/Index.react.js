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
    this.state = getAnswersState(props.question_id)
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
     this.setState(getAnswersState(this.props.question_id), this.initAnswersComponent)
   }

   initAnswersComponent(){
     Prism.highlightAll();
     // tinyMCE.activeEditor.setContent('');
     Common.initTinyMceContent('.answers');
   }

   render () {
     var answers = [], keys=[];
     if (!$.isEmptyObject(this.state.answers)) {
       keys = Object.keys(this.state.answers)
       for (var i = keys.length - 1; i >= 0; i--) {
         answers.push(<AnswerShow key={i} answer={this.state.answers[keys[i]]} />)
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
