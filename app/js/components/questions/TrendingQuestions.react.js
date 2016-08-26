import React from 'react';
import TrendingQuestion from './TrendingQuestion.react';
import {connect} from 'react-redux';

export class TrendingQuestions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let topQuestions = [];
    let questions = this.props.topQuestions;
    if (questions) {
      for (let key in questions) {
        topQuestions.push(<TrendingQuestion
          key={key}
          question={questions[key]}
          />);
      }
    }
    let content = topQuestions && topQuestions.length > 0 ?
      topQuestions :
      <i className="notched center circle loading icon"></i>;

    return (
      <div>
        <h2>Trending</h2>
        {content}
      </div>
    );
  }
}

/**
* @param {Object} state: from root reducer
* @param {Object} ownProps: for functions
* @return {Object}  {questions, filteredQuestions, page} for homepage
*/
function mapStateToProps(state) {
  return {
    topQuestions: state.questions.topQuestions
  };
}

export default connect(mapStateToProps)(TrendingQuestions);
