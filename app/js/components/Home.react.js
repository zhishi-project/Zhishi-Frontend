import React from 'react'
import Header from './layouts/Header.react'
import QuestionsList from './questions/QuestionsList.react'

class Home extends React.Component {
  constructor(props, context){
    super(props);
  }

  componentDidMount() {
    $(".ui.dropdown").dropdown();
  }

  render(){
    return (
      <div>
        <Header />

        <main className="ui container main">
          <div className="ui grid">
            <div className="twelve wide column">
              <h2>Top Questions</h2>
              {<QuestionsList />}
              <div className="ui grid question-section">
                <div className="six wide column">
                  <div className="ui grid divided three column">
                    <div className="row">

                      <div className="column">
                        <p className="vote-count">25</p>
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


              <div className="ui grid question-section">
                <div className="six wide column">
                  <div className="ui grid divided three column">
                    <div className="row">

                      <div className="column">
                        <p className="vote-count">25</p>
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

              <div className="ui grid question-section">
                <div className="six wide column">
                  <div className="ui grid divided three column">
                    <div className="row">

                      <div className="column">
                        <p className="vote-count">25</p>
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

              <div className="ui grid question-section">
                <div className="six wide column">
                  <div className="ui grid divided three column">
                    <div className="row">

                      <div className="column">
                        <p className="vote-count">25</p>
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
            </div>

            <aside className="four wide column">
              <h2>Trending</h2>

              <div className="ui grid trending-link">
                <div className="two wide column">
                  <i className="comment outline icon"></i>
                </div>

                <div className="fourteen wide column">
                  <p>
                    <a href="#">Is HTML a programming language?</a>
                  </p>
                </div>
              </div>

              <div className="ui grid trending-link">
                <div className="two wide column">
                  <i className="comment outline icon"></i>
                </div>

                <div className="fourteen wide column">
                  <p>
                    <a href="#">How does a fellow progress to D1?</a>
                  </p>
                </div>
              </div>

              <div className="ui grid trending-link">
                <div className="two wide column">
                  <i className="comment outline icon"></i>
                </div>

                <div className="fourteen wide column">
                  <p>
                    <a href="#">Is HTML a programming language?</a>
                  </p>
                </div>
              </div>

              <div className="ui grid trending-link">
                <div className="two wide column">
                  <i className="comment outline icon"></i>
                </div>

                <div className="fourteen wide column">
                  <p>
                    <a href="#">How does a fellow progress to D1?</a>
                  </p>
                </div>
              </div>

              <div className="ui grid trending-link">
                <div className="two wide column">
                  <i className="comment outline icon"></i>
                </div>

                <div className="fourteen wide column">
                  <p>
                    <a href="#">Is HTML a programming language?</a>
                  </p>
                </div>
              </div>

              <div className="ui grid trending-link">
                <div className="two wide column">
                  <i className="comment outline icon"></i>
                </div>

                <div className="fourteen wide column">
                  <p>
                    <a href="#">How does a fellow progress to D1?</a>
                  </p>
                </div>
              </div>

              <div className="ui grid trending-link">
                <div className="two wide column">
                  <i className="comment outline icon"></i>
                </div>

                <div className="fourteen wide column">
                  <p>
                    <a href="#">Is HTML a programming language?</a>
                  </p>
                </div>
              </div>

              <div className="ui grid trending-link">
                <div className="two wide column">
                  <i className="comment outline icon"></i>
                </div>

                <div className="fourteen wide column">
                  <p>
                    <a href="#">How does a fellow progress to D1?</a>
                  </p>
                </div>
              </div>


            </aside>
          </div>
        </main>

        <footer className="footer">
          <div className="ui container">
            <div className="ui grid">
              <div className="left floated seven wide column">
                <img src="assets/img/logo-footer.png" alt="zhishi-footer-logo" />
              </div>

              <div className="right floated four wide column">
                <p className="copyright">
                  &copy; Copyright 2016. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>

      </div>
    )
  }
}

module.exports = Home;
