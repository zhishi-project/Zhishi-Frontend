import React from 'react'
import Header from './layouts/Header.react'
import QuestionsList from './questions/QuestionsList.react'
import Sidebar from './layouts/Sidebar.react'

import AuthStore from '../stores/AuthStore.js'
import QuestionStore from '../stores/QuestionStore.js'


function getSearchState(){
  return {
    questions: QuestionStore.getQuestions(),
    current_user: AuthStore.getCurrentUser()
  }
}

class Search extends React.Component {
  constructor(props, context){
    super(props);
    this.state = getSearchState();
  }

  componentDidMount(){
    QuestionStore.addChangeListener(this._onChange.bind(this));
  }
  componentWillUnmount(){
    QuestionStore.removeChangeListener(this._onChange).bind(this);

  }
  _onChange() {
    this.setState(getSearchState())
  }
  render(){
    return (
      <div>
        <Header />

        <main className="ui container main">
          <div className="ui grid">
            <div className="twelve wide stacked column">
              <h2>What we found. . .</h2>
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
