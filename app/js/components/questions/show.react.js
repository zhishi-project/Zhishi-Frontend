import React from 'react'

class Question extends React.Component {

  constructor(props, context){
    super(props)
  }

  render(){
    render(
      <div className="question-thread">


        <main className="ui container main">
          <div className="ui grid">
            <div className="twelve wide column user-question-area">
              <h2 className="question-title">
                Error connecting to my localhost server from an ATM machine in Sabo?
              </h2>

              <div className="ui grid">
                <div className="row main-question">
                  <div className="two wide column">
                    <div className="rate-up"></div>
                    <div className="rate-count">25</div>
                    <div className="rate-down"></div>
                  </div>

                  <div className="fourteen wide column">
                    <div className="tags">
                      <span>
                        Ruby on rails
                      </span>

                      <span>
                        Jamb Questions
                      </span>

                      <span>
                        Scratch head questions
                      </span>
                    </div>

                    <div className="main-comment">
                      <p>
                        Hi Guys,
                      </p>

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit eveniet iure adipisci, fugiat rem quam beatae, amet aspernatur, commodi quod velit neque quis odit dolore omnis voluptatum debitis similique cupiditate.
                      </p>

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex quasi temporibus tenetur non cupiditate ratione cumque, repudiandae nisi nihil a quaerat, dolores, accusantium, eveniet amet aut fugiat debitis. Quos, debitis?
                      </p>

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque aperiam vitae excepturi soluta, illo autem libero quo quae laudantium. Eveniet minus, laboriosam asperiores officiis incidunt quisquam, expedita quis fuga nostrum?
                      </p>



                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim sed possimus, distinctio, voluptates deserunt pariatur accusamus sapiente nemo dolores nesciunt quia suscipit sit. Enim voluptate, nihil voluptates vel numquam vero.
                      </p>
                    </div>

                    <div className="user-metadata clearfix">
                      <p className="time-ago">
                        Asked 2 Hours ago
                      </p>

                      <div className="two equal width ui grid">
                        <div className="fourteen wide column">
                          <p className="user-fullname">
                            Uzo Awili
                            <span className="badges">
                              63
                            </span>
                          </p>
                        </div>

                        <div className="two wide column">
                          <img src="assets/img/profile.jpg" alt="profile-image" className="profile-img" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row answer-comment">
                  <div className="two wide column">
                    <div className="rate-up"></div>
                    <div className="rate-count">3000</div>
                    <div className="rate-down"></div>
                  </div>

                  <div className="fourteen wide column">
                    <div className="main-comment">
                      <p>
                        Hi Uzo
                      </p>

                      <p>
                        Go and hug a transformer in the <strong>forbidden forest of Ikuku,</strong> that is the only way this issue of yours
                        can be correctly resolved.
                      </p>

                      <p>
                        If that doesnt work then you would have to drink water that has been used to wash the head of a bald man as that is another way that you can resolve the atm issue.
                      </p>

                      <p>
                       Good luck.
                      </p>
                    </div>

                     <div className="user-metadata clearfix">
                      <p className="time-ago">
                        Answered 2 Hours ago
                      </p>

                      <div className="two equal width ui grid">
                        <div className="fourteen wide column">
                          <p className="user-fullname">
                            Innocent Amadi
                            <span className="badges">
                              90
                            </span>
                          </p>
                        </div>

                        <div className="two wide column">
                          <img src="assets/img/profile.jpg" alt="profile-image" className="profile-img" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row answer-comment">
                  <div className="two wide column">
                    <div className="rate-up"></div>
                    <div className="rate-count">350</div>
                    <div className="rate-down"></div>
                  </div>

                  <div className="fourteen wide column">
                    <div className="main-comment">
                      <p>
                        Hi Uzo
                      </p>

                      <p>
                        The only way to solve this is to give your life to the gods of our fathers, they alone hold the secrets to
                        solving this issue. Think about it bro.
                      </p>
                    </div>

                     <div className="user-metadata clearfix">
                      <p className="time-ago">
                        Answered 1 hour ago
                      </p>

                      <div className="two equal width ui grid">
                        <div className="fourteen wide column">
                          <p className="user-fullname">
                            Dipo Ishola
                            <span className="badges">
                              86
                            </span>
                          </p>
                        </div>

                        <div className="two wide column">
                          <img src="assets/img/profile.jpg" alt="profile-image" className="profile-img" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row new-answer">
                  <div className="sixteen wide column">
                    <h3>Give your own answer</h3>

                    <form className="ui form">
                      <div className="field">
                        <textarea cols="30" rows="10"></textarea>
                      </div>
                      <button className="ui button">
                        Post Answer
                      </button>
                    </form>
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


      </div>
    )
  }
}
module.exports = Question;
