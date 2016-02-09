import React from 'react'
import QuestionStore from '../../stores/QuestionStore.js'
import TrendingQuestion from './TrendingQuestion.react'
import QuestionActions from '../../actions/QuestionActions.js'
import webAPI from '../../utils/webAPI.js'


function getTrendingQuestionsState(){
  var top_questions = $.isEmptyObject(QuestionStore.getTopQuestions()) ? webAPI.processRequest(`/top_questions`, 'GET', "", QuestionActions.receiveTopQuestions) : QuestionStore.getTopQuestions();
  return { top_questions: top_questions }
}


class TrendingQuestions extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = getTrendingQuestionsState();
  }

  componentDidMount(){
    QuestionStore.addChangeListener(this._onChange.bind(this));
  }
  componentWillUnmount(){
    QuestionStore.removeChangeListener(this._onChange).bind(this);
  }

  _onChange(){
    this.setState(getTrendingQuestionsState())
  }
  render(){
    var trending_questions = [], keys = [];
    if (!$.isEmptyObject(this.state.top_questions)) {
      keys = Object.keys(this.state.top_questions)
      for (var i = 0; i < keys.length; i++) {
        trending_questions.push(<TrendingQuestion key={i} question={this.state.top_questions[keys[i]]} />)
      }
    }
    return (
      <div>
        <h2>Trending</h2>
        {trending_questions}
      </div>
    )
  }
}
module.exports = TrendingQuestions;
