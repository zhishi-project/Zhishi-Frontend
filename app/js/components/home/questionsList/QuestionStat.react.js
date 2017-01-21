import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars

const QuestionStat = ({question}) => {
  return (
     <div className="row">

       <div className="column">
         <p className="vote-count">{question.votes_count || 0}</p>
         <p className="vote-title">VOTES</p>
       </div>

       <div className="column">
         <p className="answer-count">{question.answers_count || 0}</p>
         <p className="answer-title">ANSWERS</p>
       </div>

       <div className="column">
         <p className="view-count">{question.views || 0}</p>
         <p className="view-title">VIEWS</p>
       </div>

     </div>
  );
};

QuestionStat.propTypes = {
  question: PropTypes.object
};

export default QuestionStat;
