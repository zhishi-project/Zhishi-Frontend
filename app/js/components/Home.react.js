import React from 'react'
import Header from './layouts/Header.react'
import QuestionsList from './questions/QuestionsList.react'
import Sidebar from './layouts/Sidebar.react'

class Home extends React.Component {
  constructor(props, context){
    super(props);
  }

  componentDidMount() {
    $(".ui.dropdown").dropdown();
  }

  render(){
    return (
      <div>
        <Header />

        <main className="ui container main">
          <div className="ui grid">
            <div className="twelve wide column">
              <h2>Recent Questions</h2>
              {<QuestionsList questions={this.props.questions}/>}
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

module.exports = Home;
