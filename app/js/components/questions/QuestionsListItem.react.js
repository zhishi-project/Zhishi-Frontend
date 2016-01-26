import React from 'react'

class QuestionsListItem extends React.Component {
  constructor(props, context) {
    super(props)
  }

  render(){
    return(
      <div className="ui grid question-section">
        <div className="six wide column">
          <div className="ui grid divided three column">
            <div className="row">

              <div className="column">
                <p className="vote-count">26</p>
                <p className="vote-title">VOTES</p>
              </div>

              <div className="column">
                <p className="answer-count">9</p>
                <p className="answer-title">ANSWERS</p>
              </div>

              <div className="column">
                <p className="view-count">104</p>
                <p className="view-title">VIEWS</p>
              </div>

            </div>
          </div>
        </div>

        <div className="ten wide column">
          <p className="question-container">
            <a href="#" className="question-link">
              How can I apply to get a training mac?
            </a>
          </p>

          <div className="equal width ui grid">
            <div className="nine wide column">
              <div className="tags">
                <span>
                  Training mac
                </span>

                <span>
                  Training mac
                </span>
              </div>
            </div>

            <div className="column">
              <p>2 Hours ago</p>
            </div>

            <div className="column">
              <span className="username">Uzo</span>
              <img src="assets/img/profile.jpg" alt="profile-image" />
            </div>

          </div>
        </div>
      </div>

    )
  }
}
module.exports = QuestionsListItem;
