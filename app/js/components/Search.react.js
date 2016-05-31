import React from 'react'
import Header from './layouts/Header.react'
import QuestionsList from './questions/QuestionsList.react'
import Sidebar from './layouts/Sidebar.react'

import AuthStore from '../stores/AuthStore.js'
import SearchStore from '../stores/SearchStore.js'
import SearchActions from '../actions/SearchActions.js'
import webAPI from '../utils/webAPI.js'

function getSearchState(search_query, first_load){
  if (search_query && first_load) {
    webAPI.processRequest('/questions/search', 'GET', search_query, SearchActions.receiveSearchResults);
  }
  return {
    questions: SearchStore.getSearchResults(),
    current_user: AuthStore.getCurrentUser()
  }
}

class Search extends React.Component {
  constructor(props, context){
    super(props);
    this.state = getSearchState(props.location.query, true);
  }

  componentDidMount(){
    SearchStore.addChangeListener(this._onChange.bind(this));
  }
  componentWillUnmount(){
    SearchStore.removeChangeListener(this._onChange).bind(this);

  }
  _onChange() {
    this.setState(getSearchState())
  }
  render(){
    const { questions } = this.state;
    let headerMsg = $.isEmptyObject(questions)
    ? <span>We found nothing. . . <a href="/questions/new">Ask a question?</a> </span>
    : "What we found. . ."
    return (
      <div>
        <Header />

        <main className="ui container main">
          <div className="ui grid">
            <div className="twelve wide stacked column">
              <h2>{headerMsg}</h2>
              {<QuestionsList questions={this.state.questions}/>}
            </div>

            <Sidebar />

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

module.exports = Search;
