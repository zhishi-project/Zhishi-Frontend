import React from 'react';
import {render} from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import {Router, Route, IndexRoute, Link, IndexLink} from 'react-router';

import AuthStore from './stores/AuthStore.js';
import * as AuthActions from './actions/AuthActions.js';
import CookieVar from './config/CookieVariables.js';

import Zhishi from './components/Zhishi.react';
import Home from './components/Home.react';
import Search from './components/Search.react';
import Login from './components/Login.react';
import Users from './components/users/Users.react';
import UsersIndex from './components/users/Index.react';
import User from './components/users/Show.react';
import Questions from './components/questions/Question.react';
import QuestionIndex from './components/questions/Index.react';
import NewQuestion from './components/questions/New.react';
import Question from './components/questions/Show.react';

// import $ from 'jquery';

$.cookie.json = true;

let userLoggedIn = function(nextState, replaceState) {
  if (!AuthStore.userLoggedIn()) {
    $.cookie(CookieVar.referrer, nextState.location.pathname, {
      path: '/'
    });
    replaceState({
      nextPathname: nextState.location.pathname
    }, '/login');
  }
};

let userLoggedOut = function(nextState, replaceState) {
  if (AuthStore.userLoggedIn()) {
    replaceState({
      nextPathname: nextState.location.pathname
    }, '/');
  }
};

let logOut = function(nextState, replaceState) {
  AuthActions.logoutUser();
  replaceState({
    nextPathname: nextState.location.pathname
  }, '/login');
};

const signUpUser = function(nextState) {
  let tempToken = nextState.location.query.temp_token;
  if (tempToken) AuthActions.loginUser(tempToken);
};

let redirectToRoot = (nextState, replaceState) => {
  replaceState({
    nextPathname: nextState.location.pathname
  }, '/');
};

export default (
  <Route >
    <Route path="/logout" onEnter={logOut} />

    <Route path="/login" component={Login} onEnter={userLoggedOut} >
      <Route path="/login/auth" onEnter={signUpUser} />
    </Route>

    <Route path="/" component={Zhishi} onEnter={userLoggedIn} >
      <IndexRoute component={Home} />

      <Route path="/search" component={Search} />
      <Route path="/users" component={Users} >
        <Route path="/users" component={UsersIndex} />
        <Route path="/users/:id" component={User} />
      </Route>

      <Route path="/questions" component={Questions} onEnter={userLoggedIn} >
        <IndexRoute component={QuestionIndex} onEnter={userLoggedIn} />
        <Route path="/questions/new" component={NewQuestion} />
        <Route path="/questions/:id" component={Question} />
      </Route>

      <Route path="*" component={Zhishi} onEnter={userLoggedIn}/>

    </Route>
  </Route>
);
