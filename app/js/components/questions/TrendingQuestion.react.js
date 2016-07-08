import React from 'react'
import Common from '../../utils/Common.js'
import { Link } from 'react-router';

const TrendingQuestion = ({ question }) => {
  var permalink = Common.createPermalink(question.id, question.title);
  return (
    <div className="ui grid trending-link item">
      <div className="two wide column">
        <i className="comment outline icon"></i>{question.answers_count}
      </div>

      <div className="question_title wide column">
        <p>
          <Link to={`/questions/${permalink}`}>{ question.title || "No title"}</Link>
        </p>
      </div>
    </div>
  )
}
export default TrendingQuestion;
