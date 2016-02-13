import React from 'react'
import AnswerShow from './Show.react'

class AllAnswers extends React.Component {
  constructor(props, context){
    super(props)
   }

   render () {
     var answers = [], keys=[];
     if (!$.isEmptyObject(this.props.answers)) {
       keys = Object.keys(this.props.answers)
       for (var i = keys.length - 1; i >= 0; i--) {
         answers.push(<AnswerShow key={i} answer={this.props.answers[keys[i]]} />)
       }
     }
     var ans_statement = this.props.answers_count == 1 ? "Answer" : "Answers"
     return (
       <div className="sixteen wide column">
         <div className="ui grid">
           <h4 className="ui dividing full-width answers header">
              <i className="comments outline icon"></i>
              <div className="content">
                {this.props.answers_count || "No"} {ans_statement}
              </div>
            </h4>
           {answers}
         </div>
       </div>
     )
   }
 }
 module.exports = AllAnswers;
