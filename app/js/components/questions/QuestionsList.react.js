import React from 'react'
import QuestionsListItem from './QuestionsListItem.react'

class QuestionsList extends React.Component {
  constructor(props, context) {
    super(props)
  }

  render(){
    var items = [];
    for (var i = 0; i < 6; i++) {
      items.push(<QuestionsListItem />)
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
