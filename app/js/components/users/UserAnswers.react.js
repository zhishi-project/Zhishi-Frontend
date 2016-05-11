import React from 'react';

const UserAnswers = (props) => {
   return (
    <div className="ui grid question-section">
            <div className="two wide computer only column stats stats-values answers">
                <div className="row">
                  <div className="column">
                    <p className="answer-count">9</p>
                    <p className="answer-title">ANSWERS</p>
                  </div>
              </div>
            </div>
              <div className="fourteen wide mobile fourteen wide computer question column">
                  <p className="question-container">
                    Lore ipsum Lorem Ipsum lorem ipsum Lore ipsum Lorem Ipsum lorem ipsum
                    Lore ipsum Lorem Ipsum lorem ipsum  Lore ipsum Lorem Ipsum lorem ipsum
                    Lore ipsum Lorem Ipsum lorem ipsum  Lore ipsum Lorem Ipsum lorem ipsum
                    Lore ipsum Lorem Ipsum lorem ipsum
                  </p>
                  <div className="equal width ui computer only grid metadata">
                      <div className="right floated  right aligned five wide column">
                        <span> Answered on 4th October 2016</span>
                      </div>
                  </div>
              </div>
          <div className="sixteen wide mobile sixteen wide computer answer-col column">
                  <div className="equal width ui computer only grid metadata">
                      <div className="right floated ten wide column">
                        <div className="ui divider"></div>
                        <p> test User Name <span className="right-text">
                          Answered on 4th October 2016</span>
                        </p>
                        <p className="content">
                        This are the contents
                        </p>

                      </div>
                  </div>
              </div>
        </div>
      )
}

export default UserAnswers