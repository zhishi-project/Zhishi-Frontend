import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars
import QuestionsListItem from './QuestionsListItem.react';

const QuestionsList = ({questions}) => {
  let items = [];
  let keys = [];
  if (questions) {
    keys = Object.keys(questions);
    for (var i = keys.length - 1; i >= 0; i--) {
      items.push(<QuestionsListItem key={i} question={questions[keys[i]]} />);
    }
  }
  return (
    <div>
      {items}
    </div>
  );
};

QuestionsList.propTypes = {
  questions: PropTypes.object
};

export default QuestionsList;
