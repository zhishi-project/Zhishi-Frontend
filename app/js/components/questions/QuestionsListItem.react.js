
import React from 'react'

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
    return(
      <div className="ui grid question-section">
        <div className="six wide column">
          <div className="ui grid divided three column">
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
                <p className="view-count">{question.views_count || 0}</p>
                <p className="view-title">VIEWS</p>
              </div>

            </div>
          </div>
        </div>

        <div className="ten wide column">
          <p className="question-container">
            <a href={`/questions/${question.id}` || "#"} className="question-link">
              {question.title || "No title"}
            </a>
          </p>

          <div className="equal width ui grid">
            <div className="nine wide column">
              <div className="tags">
                {tags}
              </div>
            </div>

            <div className="column">
              <p>{question.created_at_in_words || "some time ago"}</p>
            </div>

            <div className="column">
              <span className="username">{question.user_first_name || "No name yet"}</span>
              <img src={question.user_image || "/assets/img/profile.jpg"} alt="profile-image" />
            </div>

          </div>
        </div>
      </div>

    )
  }
}
module.exports = QuestionsListItem;
