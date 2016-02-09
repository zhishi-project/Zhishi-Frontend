import React from 'react'
import AnswerShow from './Show.react'

class AllAnswers extends React.Component {
  constructor(props, context){
    super(props)
   }

   render () {
     var answers = [];
     debugger;
     if (!$.isEmptyObject(this.props.answers)) {
       for (var i; i < this.props.answers.length; i++) {
         answers.push(<AnswerShow />)
       }
     }
     return (
       <div className="">
         {answers}
       </div>
     )
   }
 }
 module.exports = AllAnswers;
