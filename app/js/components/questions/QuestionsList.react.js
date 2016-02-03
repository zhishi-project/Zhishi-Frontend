import React from 'react'
import QuestionsListItem from './QuestionsListItem.react'

class QuestionsList extends React.Component {
  constructor(props, context) {
    super(props)
  }

  render(){
    var items = [];
    if (this.props.questions) {
      for (var i = 0; i < this.props.questions.length; i++) {
        items.push(<QuestionsListItem question={this.props.questions[i]} />)
      }
    }
    debugger;
    return(
      <div>
        {items}
      </div>
    )
  }
}
module.exports = QuestionsList;
