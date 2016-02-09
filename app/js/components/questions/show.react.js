import React from 'react'
import Header from '../layouts/Header.react'
import Sidebar from '../layouts/Sidebar.react'
import Tags from '../layouts/Tags.react'
import NewQuestionForm from '../answers/New.react.js'
import Answers from '../answers/AllAnswers.react.js'


class Question extends React.Component {

  constructor(props, context){
    super(props)
  }

  render(){
    var question = this.props.app_state.question || {};
    var username = question.user ? question.user.name : "";
    var user_avatar = question.user ? question.user.image : "";
    var code_to_parse = '<pre><code class="language-javascript">\r\n \
    function parseXml(str) { \r\n \
      var doc; \r\n \
      if (typeof ActiveXObject !== undefined) { \r\n \
        doc = new ActiveXObject("Microsoft.XMLDOM"); \r\n \
        doc.loadXml(str); \r\n \
        return doc; \r\n \
      } \r\n \
    }</code></pre>'
    return(
      <div className="question-thread">
        <Header />

        <main className="ui container main">
          <div className="ui grid">
            <div className="twelve wide column user-question-area">
              <h2 className="question-title">
                {question.title || ""}
              </h2>

              <div className="ui grid">
                <div className="row main-question">
                  <div className="two wide column">
                    <div className="rate-up"></div>
                    <div className="rate-count">{question.votes_count || 0}</div>
                    <div className="rate-down"></div>
                  </div>

                  <div className="fourteen wide column">
                    <div className="tags">
                      {<Tags tags={question.tags} />}
                    </div>

                    <div className="main-comment">
                      <div dangerouslySetInnerHTML={{__html: question.content}} />
                    </div>

                    <div className="user-metadata clearfix">
                      <p className="time-ago">
                        {question.created_at_in_words || "Asked 2 Hours ago"}
                      </p>

                      <div className="two equal width ui grid">
                        <div className="fourteen wide column">
                          <p className="user-fullname">
                            {username || "No name yet"}
                            <span className="badges">
                              {question.points || 0}
                            </span>
                          </p>
                        </div>

                        <div className="two wide column">
                          <img src={user_avatar} alt="profile-image" className="profile-img" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Answers answers={question.answers} />

                <NewQuestionForm question_id={question.id} />
              </div>
            </div>

            <Sidebar top_questions={this.props.app_state.top_questions} />

          </div>
        </main>


      </div>
    )
  }
}
module.exports = Question;
