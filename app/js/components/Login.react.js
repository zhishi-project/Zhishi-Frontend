import React, {PropTypes} from 'react';
import Auth from '../auth';
import DisplayStore from '../stores/DisplayStore.js';
import * as AuthActions from '../actions/AuthActions.js';
import Config from '../config/environment';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import isEmpty from '../utils/isEmpty';
import CookieVar from '../config/CookieVariables.js';
import {browserHistory} from 'react-router';
import cookie from 'js-cookie';


let loginState = () => {
  return {
    quotes: DisplayStore.getQuotes(),
    loggedInToday: Auth.getLoggedInToday()
  };
};

class Login extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = loginState();
    this.redirectToReferrerIfAny = this.redirectToReferrerIfAny.bind(this);
    this.signUpPath = this.signUpPath.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.currentUser)) {
      this.redirectToReferrerIfAny();
    }
  }

  componentWillMount() {
    const {actions, location} = this.props;
    if (location.query.temp_token) actions.loginUser(location.query);
  }

  componentDidMount() {
    var chosenQuotes = function(quotes) {
      return shuffle(quotes);
    };

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

    $('.messages').typeIt({
      strings: chosenQuotes(this.state.quotes),
      speed: 90,
      startDelay: 10,
      breakDelay: 3000,
      cursor: true,
      breakLines: false,
      loop: true,
      lifeLike: false,
      loopDelay: 500
    });

    this.autoLogUserIn();
  }

  autoLogUserIn() {
    if (!this.state.loggedInToday) {
      setTimeout(this.signIn, 1000, this.signUpPath());
    }
  }

  redirectToReferrerIfAny() {
    if (cookie.get(CookieVar.referrer)) {
      var referrer = cookie.get(CookieVar.referrer);
      cookie.remove(CookieVar.referrer);
      window.location = referrer;
    } else {
      window.location = '/';
    }
  }

  signIn(signUpPath) {
    window.location = signUpPath;
  }

  signUpPath() {
    return `${Config.host}/login/google?redirect_url=http://${
          window.parent.location.host}/login/auth`;
  }

  render() {
    let autoSignInMsg = this.state.loggedInToday ? '' :
      <span>
        Ushering you in in a few seconds &nbsp;
        <i className="ui active small inline loader"></i>
      </span>;
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
            <a href={this.signUpPath()} className="ui button">
              <i className="google plus icon"></i>
              Sign in with your Andela email
            </a>
          </div>

          <div className="sign-in-desc">
            {autoSignInMsg}
          </div>

        </section>

        <footer className="footer">
          <p>
            &copy; Copyright 2016. All Rights Reserved.
          </p>
        </footer>

      </div>
    );
  }
}

Login.contextTypes = {
  history: React.PropTypes.object.isRequired
};

/**
* @param {Object} state: from root reducer
* @param {Object} ownProps: for functions
* @return {Object}  {questions, filteredQuestions, page} for homepage
*/
function mapStateToProps(state, ownProps) {
  return {...state.auth};
}

/**
* @param {Func} dispatch: from root reducer
* @return {Object}  actions to be bound
*/
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
