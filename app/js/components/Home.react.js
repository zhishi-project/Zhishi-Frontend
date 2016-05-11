import React from 'react'
import Header from './layouts/Header.react'
import Footer from './layouts/Footer.react'
import QuestionsList from './questions/QuestionsList.react'
import Sidebar from './layouts/Sidebar.react'
import ZhishiQuestions from '../utils/ZhishiInit.js'

import AuthStore from '../stores/AuthStore.js'
import QuestionStore from '../stores/QuestionStore.js'
import UserStore from '../stores/UserStore.js'

import QuestionActions from '../actions/QuestionActions.js'

import TagModal from './partials/TagModal.react'

import _ from 'jquery'

import webAPI from "../utils/webAPI.js";

function getHomeState(){
  let questions = QuestionStore.getQuestions();
  let current_page = QuestionStore.getCurrentPage();
  let current_user = AuthStore.getCurrentUser();

  if (_.isEmptyObject(questions)) {
    webAPI.processRequest(`/questions/personalized`,
      "GET", {page: current_page},
      (data) => {
        if (!data._error) {
          QuestionActions.receiveQuestions({
            questions: data.questions ,
            page: current_page
          })
        }
    });
  }

  return {
    questions: questions,
    current_page: current_page,
    current_user: current_user,
    top_questions: QuestionStore.getTopQuestions(),
    should_fetch: QuestionStore.shouldFetchQuestions()
  }
}

class Home extends React.Component {
  constructor(props, context){
    super(props);
    this.state = getHomeState(1);
  }

  componentDidMount(){
    QuestionStore.addChangeListener(this._onChange.bind(this));
    UserStore.addChangeListener(this._onChange.bind(this));
    let next_page = this.state.current_page
    $( window ).scroll(function() {
      if($(window).scrollTop() + $(window).height() == $(document).height()) {
        next_page++
        ZhishiQuestions.getQuestions(next_page);
     }
    });
  }

  componentWillUnmount(){
    QuestionStore.removeChangeListener(this._onChange);
    UserStore.removeChangeListener(this._onChange);
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
    let current_user = this.state.current_user || {}
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
            {current_user.tags ? "" : <TagModal trigger="tagModalTrigger" />}
          </div>
        </main>

        <Footer />

      </div>
    )
  }
}

module.exports = Home;
