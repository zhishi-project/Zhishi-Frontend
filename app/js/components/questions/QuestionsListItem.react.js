import React from 'react';
import Common from '../../utils/Common.js';
import {Link} from 'react-router';

const QuestionsListItem = ({question}) => {


  var tags = [], index = 0;
  if (question && question.tags) {
    question.tags.forEach(function(tag) {
      tags.push(<span key={index++}>{tag.name}</span>);
    });
  }
  var username = question.user ? question.user.name : '';
  var user_avatar = question.user ? question.user.image : '';
  var question_date = new Date(question.created_at);
  var permalink = Common.createPermalink(question.id, question.title);
  var userPermalink = Common.createPermalink(question.user.id, username);
  return (
    <div className="ui grid question-section">
      <div className="four wide computer only column stats">
        <div className="ui grid divided three column stats-values stats-values">
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
        </div>
      </div>


      <div className="sixteen wide mobile twelve wide computer question column">
        <p className="question-container">
          <Link to={`/questions/${permalink}` || '#'} className="question-link">
            {question.title || 'No title'}
          </Link>
        </p>
        <p className="ui tablet only mobile only grid mobile-meta">
          asked by &nbsp;<a href={`/users/${userPermalink}`}>{username}</a>
        </p>
        <div className="equal width ui computer only grid metadata">
          <div className="eight wide column">
            <div className="tags">
              {tags}
            </div>
          </div>

          <div className="three wide column">
            <p>Asked on {question_date.toDateString() || '(no date )'}</p>
          </div>

          <div className="five wide column">
            <a href={`/users/${userPermalink}`} className="username" title={username}>{username}</a>
            <img src={user_avatar || '/assets/img/avatar.png'} alt="profile-image" className={"thumb"} />
          </div>

        </div>
      </div>
    </div>

    );
};
export default QuestionsListItem;
