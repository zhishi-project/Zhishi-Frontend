import React from 'react'
import Header from './layouts/Header.react'
import Footer from './layouts/Footer.react'
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

        <Footer />

      </div>
    )
  }
}

module.exports = Home;
