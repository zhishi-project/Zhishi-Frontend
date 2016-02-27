import React from 'react'
import Common from '../../utils/Common.js'


class QuestionsListItem extends React.Component {
  constructor(props, context) {
    super(props)
  }

  render(){
    var tags = [];
    var question = this.props.question;
    if (question && question.tags) {
      question.tags.forEach(function(tag) {
        tags.push(<span>{tag}</span>);
      })
    }
    var username = question.user ? question.user.name : "";
    var user_avatar = question.user ? question.user.image : "";
    var question_date = new Date(question.created_at);
    var permalink = Common.createPermalink(question.id, question.title);
    return(
      <div className="ui grid question-section">
        <div className="four wide column stats">
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


        <div className="twelve wide question column">
          <p className="question-container">
            <a href={`/questions/${permalink}` || "#"} className="question-link">
              {question.title || "No title"}
            </a>
          </p>

          <div className="equal width ui grid metadata">
            <div className="eight wide column">
              <div className="tags">
                {tags}
              </div>
            </div>

            <div className="three wide column">
              <p>Asked on {question_date.toDateString() || "(no date )"}</p>
            </div>

            <div className="five wide column">
              <span className="username" title={username}>{username}</span>
              <img src={user_avatar || "/assets/img/profile.jpg"} alt="profile-image" className={"thumb"} />
            </div>

          </div>
        </div>
      </div>

    )
  }
}
module.exports = QuestionsListItem;
