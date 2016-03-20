import React from 'react'
import QuestionsListItem from './QuestionsListItem.react'

class QuestionsList extends React.Component {
  constructor(props, context) {
    super(props)
  }

  render(){
    var items = [], keys=[];
    if (this.props.questions) {
      keys = Object.keys(this.props.questions)
      for (var i = keys.length - 1; i >= 0; i--) {
        items.push(<QuestionsListItem key={i} question={this.props.questions[keys[i]]} />)
      }
    }
    // var content = !$.isEmptyObject(items) ? items : <i className="notched center circle loading icon"></i>
    return(
      <div>
        {items}
      </div>
    )
  }
}
module.exports = QuestionsList;
