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


import _ from 'jquery'

import webAPI from "../utils/webAPI.js";

function getHomeState(){
  let questions = QuestionStore.getQuestions();
  let current_page = QuestionStore.getCurrentPage();
  let current_user = AuthStore.getCurrentUser();


  return {
    questions: questions,
    current_page: current_page,
    current_user: current_user,
    top_questions: QuestionStore.getTopQuestions(),
    filteredQuestions: QuestionStore.filtedQuestion,
    should_fetch: QuestionStore.shouldFetchQuestions()
  }
}

class Home extends React.Component {
  constructor(props, context){
    super(props);
    this.state = getHomeState(1);
    this.state.showFilters = false;
    this.state.selectedTags = [];
    this.showFilterAction = this.showFilterAction.bind(this);
    this._onChange = this._onChange.bind(this);
    this.onTagSelect = this.onTagSelect.bind(this);
    this.loadTagSelection = this.loadTagSelection.bind(this);
  }

  componentWillMount() {
    let currentPage = QuestionStore.getCurrentPage();
    ZhishiQuestions.getQuestions(currentPage);
  }

  componentDidMount(){
    QuestionStore.addChangeListener(this._onChange);
    UserStore.addChangeListener(this._onChange);
    console.log(this.state);
    var self = this;
    let next_page = this.state.current_page
    $( window ).on('scroll', function() {
      if($(window).scrollTop() + $(window).height() == $(document).height()) {
        next_page++
        ZhishiQuestions.getQuestions(next_page, self.state.selectedTags);
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
    let selectedTags = this.state.selectedTags;
    selectedTags = this.populateArray(e, selectedTags);
    if ($.isEmptyObject(selectedTags)) {
      ZhishiQuestions.getQuestions();
    } else {
      ZhishiQuestions.getFilteredQuestions(null, selectedTags);
    }
  }
  populateArray(e, selectedTags) {
    if(selectedTags.indexOf(e.target.value) == -1  && e.target.checked){
      selectedTags.push(e.target.value);
    }
    else {
      let index = selectedTags.indexOf(e.target.value);
      selectedTags.splice(index, 1);
    }
    return selectedTags;
  }
  loadTagSelection (tag, i) {
    return (<TagSelection onTagSelect={this.onTagSelect} tag={tag} key={i}/>);
  }
  showFilterAction(){
    this.setState({showFilters: !this.state.showFilters});
  }

  _onChange() {
    this.setState(getHomeState(this.state.current_page))
  }
  render(){
    var questions = QuestionStore.getQuestions();
    let ajax_icon = this.state.should_fetch ? <i className="notched center circle loading icon"></i> : null
    let current_user = this.state.current_user || {}
    let filterDiv = this.state.showFilters
      ? <div className="ui form"> <div className="inline fields">
            {current_user.tags.map(this.loadTagSelection)} </div>
        </div>
      : null
    return (
      <div className="main-wrapper homepage">

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


          </div>
        </main>


      </div>
    )
  }
}

module.exports = Home;
