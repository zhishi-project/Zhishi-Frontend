import React from 'react'
import TrendingQuestions from '../questions/TrendingQuestions.react.js'

class Sidebar extends React.Component {

  constructor(props, context) {
    super(props);
  }

  render(){
    return (
      <aside className="four wide computer only column">
        <div className="sidebar wide column">
          <TrendingQuestions top_questions={this.props.top_questions}/>
        </div>
      </aside>
    )
  }
}
module.exports = Sidebar;
