import React from 'react'
import Header from './layouts/Header.react'
import Footer from './layouts/Footer.react'
import QuestionsList from './questions/QuestionsList.react'
import Sidebar from './layouts/Sidebar.react'
import ZhishiQuestions from '../utils/ZhishiInit.js'

import AuthStore from '../stores/AuthStore.js'
import QuestionStore from '../stores/QuestionStore.js'


function getHomeState(){
  return {
    questions: QuestionStore.getQuestions(),
    top_questions: QuestionStore.getTopQuestions(),
    current_user: AuthStore.getCurrentUser(),
    should_fetch: QuestionStore.shouldFetchQuestions(),
    current_page: QuestionStore.getCurrentPage()
  }
}

class Home extends React.Component {
  constructor(props, context){
    super(props);
    this.state = getHomeState(1);
  }

  componentDidMount(){
    QuestionStore.addChangeListener(this._onChange.bind(this));
    $( window ).scroll(function() {
      if($(window).scrollTop() + $(window).height() == $(document).height()) {
        let _home = new Home;
        let next_page = _home.state.current_page + 1;
        ZhishiQuestions.getQuestions(next_page);
        console.log('next page: ', next_page)
     }
    });
  }
  componentWillUnmount(){
    QuestionStore.removeChangeListener(this._onChange).bind(this);
    $(window).unbind('scroll');
  }

  shouldComponendUpdate() {
    return this.state.should_fetch
  }

  _onChange() {
    this.setState(getHomeState(this.state.current_page))
  }
  render(){
    var questions = QuestionStore.getQuestions(this.state.question_ids);
    let ajax_icon = this.state.should_fetch ? <i className="notched center circle loading icon"></i> : null
    return (
      <div className="main-wrapper homepage">
        <Header />

        <main className="ui container main">
          <div className="ui grid">
            <div className="sixteen wide tablet twelve wide computer column">
              <h2>Recent Questions</h2>
              {<QuestionsList questions={questions} current_page={this.state.current_page} />}
              {ajax_icon}
            </div>

            <Sidebar top_questions={this.state.top_questions} />

          </div>
        </main>

        <Footer />

      </div>
    )
  }
}

module.exports = Home;
