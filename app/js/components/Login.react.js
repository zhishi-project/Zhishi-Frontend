import React from 'react'
import webAPI from '../utils/webAPI.js'
import AuthStore from '../stores/AuthStore.js'
import AuthActions from '../actions/AuthActions.js'

let signUpPath = 'http://zhishi-engine.herokuapp.com/login/google?redirect_url=http://localhost:8080/login/auth';
class Login extends React.Component {
  constructor(props, context) {
    super(props);
  }

  signIn() {
    let path = '/login/google?redirect_url=http://localhost:8080/login/auth';
    window.location.href = signUpPath;
  }
  render(){
    return (
      <div className="index center aligned ui container full-height">
        <section className="header">
          <header>
            <div className="logo-container">
              <img src="assets/img/logo-landing.png" alt="Zhishi-Logo" />
            </div>
          </header>

          <div className="sign-in-area text container">
            <h1>A problem shared is a problem half-solved!</h1>
            <a href={signUpPath}  className="ui button">
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
