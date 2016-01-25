import React from 'react'

class Login extends React.Component {
  constructor(props, context) {
    super(props);
  }

  render(){
    return (
      <div className="index center aligned ui container">
        <section className="header">
          <header>
            <div className="logo-container">
              <img src="assets/img/logo-landing.png" alt="Zhishi-Logo" />
            </div>
          </header>

          <div className="sign-in-area text container">
            <h1>A problem shared is a problem half-solved!</h1>
            <a href="#" className="ui button">
              <i className="google plus icon"></i>
              Sign in with your Andela email
            </a>
          </div>
        </section>

        <footer className="footer">
          <p>
            &copy; Copyright 2016. All Rights Reserved.
          </p>
        </footer>

      </div>
    )
  }
}
module.exports = Login;
