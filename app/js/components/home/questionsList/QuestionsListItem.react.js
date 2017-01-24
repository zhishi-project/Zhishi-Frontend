import React, {PropTypes} from 'react';
import QuestionStat from './QuestionStat.react';
import QuestionMeta from './questionMeta/Meta.react';

const QuestionsListItem = ({question}) => {
  return (
    <div className="ui grid question-section">
      <div className="four wide computer only column stats">

        <div className="ui grid divided three column stats-values stats-values">
          <QuestionStat question={question}/>
        </div>

      </div>

     <div className="sixteen wide mobile twelve wide computer question column">
       <QuestionMeta question={question}/>
     </div>

    </div>
  );
};

QuestionsListItem.propTypes = {
  question: PropTypes.object
};

export default QuestionsListItem;
