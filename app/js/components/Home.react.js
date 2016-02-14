import React from 'react'
import Header from './layouts/Header.react'
import QuestionsList from './questions/QuestionsList.react'
import Sidebar from './layouts/Sidebar.react'

import AuthStore from '../stores/AuthStore.js'
import QuestionStore from '../stores/QuestionStore.js'


function getHomeState(){
  return {
    questions: QuestionStore.getQuestions(),
    top_questions: QuestionStore.getTopQuestions(),
    current_user: AuthStore.getCurrentUser()
  }
}

class Home extends React.Component {
  constructor(props, context){
    super(props);
    this.state = getHomeState();
  }

  componentDidMount(){
    QuestionStore.addChangeListener(this._onChange.bind(this));
  }
  componentWillUnmount(){
    QuestionStore.removeChangeListener(this._onChange).bind(this);

  }
  _onChange() {
    this.setState(getHomeState())
  }
  render(){
    return (
      <div>
        <Header />

        <main className="ui container main">
          <div className="ui grid">
            <div className="twelve wide stacked column">
              <h2>Recent Questions</h2>
              {<QuestionsList questions={this.state.questions}/>}
            </div>

            <Sidebar top_questions={this.state.top_questions} />

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
