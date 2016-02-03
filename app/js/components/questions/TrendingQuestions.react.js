import React from 'react'

class TrendingQuestion extends React.Component {
  constructor(props, context) {
    super(props)
  }

  render () {
    <div className="ui grid trending-link">
      <div className="two wide column">
        <i className="comment outline icon"></i>
      </div>

      <div className="fourteen wide column">
        <p>
          <a href="#">{ this.props.trending_question || "No title"}</a>
        </p>
      </div>
    </div>
  }
}

class TrendingQuestions extends React.Component {

  constructor(props, context) {
    super(props);
  }

  render(){
    var trending_questions = [];
    if (this.props.trending_questions) {
      this.props.trending_questions.forEach(function(trending_question) {
        trending_questions.push(<TrendingQuestion question={trending_question} />)
      })
    }

    return (
      <div className="sixteen wide column">
        <h2>Trending</h2>
        {trending_questions}
      </div>
    )
  }
}
module.exports = TrendingQuestions;
