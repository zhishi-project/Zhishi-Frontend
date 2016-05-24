import React from 'react'
import Header from './layouts/Header.react'
import Footer from './layouts/Footer.react'
import QuestionsList from './questions/QuestionsList.react'
import Sidebar from './layouts/Sidebar.react'
import TagSelection from './layouts/TagSelection.react'
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
    this.state.showFilters = false;
    this.showFilterAction = this.showFilterAction.bind(this);
    this._onChange = this._onChange.bind(this);
    this.onTagSelect = this.onTagSelect.bind(this);
    this.loadTagSelection = this.loadTagSelection.bind(this);
  }

  componentDidMount(){
    QuestionStore.addChangeListener(this._onChange);
    UserStore.addChangeListener(this._onChange);
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
  onTagSelect(e){
    console.log(e.target.value, e.target.checked)
    console.log('got here');
  }
  loadTagSelection (tag, i) {
    return (<TagSelection onTagSelect={this.onTagSelect} tag={tag} key={i}/>);
  }
  showFilterAction(){
    console.log('got here');
    this.setState({showFilters: !this.state.showFilters});
  }

  _onChange() {
    this.setState(getHomeState(this.state.current_page))
  }
  render(){
    var questions = QuestionStore.getQuestions(this.state.question_ids);
    console.log(questions);
    let ajax_icon = this.state.should_fetch ? <i className="notched center circle loading icon"></i> : null
    let current_user = this.state.current_user || {}
    let filterDiv = this.state.showFilters ? <div className="ui form"> <div className="inline fields">
            {current_user.tags.map(this.loadTagSelection)} </div>
            <button className="ui blue basic button">
            Filter Questions
            </button>
            </div>: null
    return (
      <div className="main-wrapper homepage">
        <Header />

        <main className="ui container main">
          <div className="ui grid">
            <div className="sixteen wide tablet sixteen wide computer column">
             <button className="mini ui primary button" onClick={this.showFilterAction}>Show filters</button>

                {filterDiv}


            </div>
            <div className="sixteen wide tablet twelve wide computer column">
              <h2>Recent Questions</h2>
              {<QuestionsList questions={questions} current_page={this.state.current_page} />}
              {ajax_icon}
            </div>

            <Sidebar top_questions={this.state.top_questions} />
            {current_user.tags ? ""
            : <TagModal options={{
                  modalId: "selectTagModal",
                  autoShow: true,
                  closable: false
              }} />}
          </div>
        </main>

        <Footer />

      </div>
    )
  }
}

module.exports = Home;
