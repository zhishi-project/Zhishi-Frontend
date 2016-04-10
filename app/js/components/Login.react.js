import React from 'react'
import webAPI from '../utils/webAPI.js'
import AuthStore from '../stores/AuthStore.js'
import DisplayStore from '../stores/DisplayStore.js'
import AuthActions from '../actions/AuthActions.js'
import Config from "../config/environment.js"


let signUpPath = `${Config.host}/login/google?redirect_url=http://${window.parent.location.host}/login/auth`;

let loginState = () => {
  return { quotes: DisplayStore.getQuotes() }
}

class Login extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = loginState();
  }

  signIn() {
    let path = '/login/google?redirect_url=http://localhost:8080/login/auth';
    window.location.href = signUpPath;
  }

  componentDidMount() {
    var chosenQuotes = function(quotes) {
      return shuffle(quotes)
    }

    function shuffle(a) {
        var j, x, i;
        for (i = a.length; i; i -= 1) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
        return a;
    }

    $(".messages").typeIt({
      strings: chosenQuotes(this.state.quotes),
      speed: 90,
      startDelay: 1000,
      breakDelay: 3000,
      cursor: true,
      breakLines: false,
      loop: true,
      lifeLike: false,
      loopDelay: 500
    });
  }

  render(){
    return (
      <div className="index center aligned ui container full-height">
        <section className="header">
          <header>
            <div className="logo-container">
              <img src="/assets/img/logo-landing.png" alt="Zhishi-Logo" />
            </div>
          </header>

          <div className="sign-in-area text container">
            <h1 className="messages"></h1>
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
