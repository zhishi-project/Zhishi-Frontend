import React from 'react';
import AnswerShow from './Show.react';
import {connect} from 'react-redux';

class AllAnswers extends React.Component {
  constructor(props) {
    super(props);
  }

 initAnswersComponent() {
   Prism.highlightAll();
 }

 sortAnswers(answerObj) {
   let answersArr = [];
   let acceptedAnswer;

  // converted the object into an array so we can sort
   for (var key in answerObj) {
     if (answerObj[key].accepted) {
       acceptedAnswer = answerObj[key];
     } else {
       answersArr.push(answerObj[key]);
     }
   }
   answersArr = answersArr.sort((current, next) => {
     return current.votes_count - next.votes_count;
   });
   if (acceptedAnswer) answersArr.push(acceptedAnswer);
   return answersArr;
 }

 render() {
   var answers = [];
   let keys = [];
   let sortedAnswers = this.sortAnswers(this.props.answers);
   if (sortedAnswers && !Object.is(sortedAnswers, {})) {
     keys = Object.keys(sortedAnswers);
     for (var i = keys.length - 1; i >= 0; i--) {
       answers.push(<AnswerShow
                      key={i}
                      answer={sortedAnswers[keys[i]]}
                      question={this.props.question}
                    />);
     }
   }
  //  else if (!this.state.answers) {
  //     answers.push(<i key={0} className="notched circle centered loading icon"></i>)
  //  }
   var ansStatement = keys.length === 1 ? 'Answer' : 'Answers';
   return (
     <div className="sixteen wide answers column">
       <div className="ui grid">
         <h4 className="ui dividing full-width answers header">
            <i className="comments outline icon"></i>
            <div className="content">
              {keys.length || 'No'} {ansStatement}
            </div>
          </h4>
         {answers}
       </div>
     </div>
   );
 }
}

/**
* @param {Object} state: from root reducer
* @param {Object} ownProps: for functions
* @return {Object}  {questions, filteredQuestions, page} for homepage
*/
function mapStateToProps(state, ownProps) {
  return {
    answers: state.answers[ownProps.questionId]
  };
}

export default connect(mapStateToProps)(AllAnswers);
