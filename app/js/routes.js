import React from 'react';
import {Route, IndexRoute} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import AuthStore from './stores/AuthStore.js';
import AuthActions from './actions/AuthActions.js';
import webAPI from './utils/webAPI.js';
import CookieVar from './config/CookieVariables.js';

import App from './components/App.react';
import Zhishi from './components/Zhishi.react';
import Home from './components/Home.react';
import Search from './components/Search.react';
import Login from './components/Login.react';
import Users from './components/users/Users.react';
import UsersIndex from './components/users/Index.react';
import User from './components/users/Show.react';
import QuestionIndex from './components/questions/Index.react';
import NewQuestion from './components/questions/New.react';
import Question from './components/questions/Show.react';

// import $ from 'jquery';

$.cookie.json = true;

let userLoggedIn = function(nextState, replaceState) {
  // if (!AuthStore.userLoggedIn()) {
  //   $.cookie(CookieVar.referrer, nextState.location.pathname, {
  //     path: '/'
  //   });
  //   replaceState({
  //     nextPathname: nextState.location.pathname
  //   }, '/login');
  // }
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

let SignUpUser = function(nextState) {
  if (!$.isEmptyObject(nextState.location.query.temp_token)) {
    webAPI.processRequest(
      '/validate_token',
      'POST',
      nextState.location.query,
      AuthActions.loginUser
    );
  }
};

let redirectToRoot = (nextState, replaceState) => {
  replaceState({
    nextPathname: nextState.location.pathname
  }, '/');
};

let history = createBrowserHistory();

history.listen(function(location) {
  window.ga('create', 'UA-76284809-1', 'auto');
  window.ga('send', 'pageview', location.pathname);
});

export default (
  <Route >
    <IndexRoute component={Home} />

    <Route path="logout" onEnter={logOut} />

    <Route path="login" component={Login} onEnter={userLoggedOut} >
      <Route path="login/auth" onEnter={SignUpUser} />
    </Route>

    <Route path="/" component={Zhishi} onEnter={userLoggedIn} >
      <IndexRoute component={Home} />

      <Route path="search" component={Search} />
      <Route path="users" component={Users} >
        <Route path="users" component={UsersIndex} />
        <Route path="users/:id" component={User} />
      </Route>

      <Route path="questions" component={Home} >
        <IndexRoute component={QuestionIndex} onEnter={userLoggedIn} />
        <Route path="questions/new" component={NewQuestion} />
        <Route path="questions/:id" component={Question} />
      </Route>

      <Route path="*" component={Zhishi} onEnter={userLoggedIn}/>

    </Route>
  </Route>
);
