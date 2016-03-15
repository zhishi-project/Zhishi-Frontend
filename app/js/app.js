import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, Route, IndexRoute, Link, IndexLink } from 'react-router'

import AuthStore from './stores/AuthStore.js';
import AuthActions from './actions/AuthActions.js'
import webAPI from './utils/webAPI.js'
import ZhishiInit from './utils/ZhishiInit.js';
import CookieVar from './config/CookieVariables.js'

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

$.cookie.json = true

let user_logged_in = function(nextState, replaceState) {
  if (!AuthStore.userLoggedIn()) {
    $.cookie(CookieVar.referrer, nextState.location.pathname, {path: '/'})
    replaceState({ nextPathname: nextState.location.pathname }, '/login')
  }
}


let user_logged_out = function(nextState, replaceState) {
  if (AuthStore.userLoggedIn()) {
    replaceState({ nextPathname: nextState.location.pathname }, '/')
  }
}

let log_out = function(nextState, replaceState) {
  AuthActions.logoutUser();
  replaceState({ nextPathname: nextState.location.pathname }, '/login')
}

let SignUpUser = function(nextState, replaceState){
  if (!$.isEmptyObject(nextState.location.query.temp_token)) {
    webAPI.processRequest('/validate_token', 'POST', nextState.location.query, AuthActions.loginUser)
  }
}

// make api call if user is logged in and homepage is visited
let initData = function(nextState) {
  if (nextState.location.pathname === '/' && AuthStore.userLoggedIn() ) {
    ZhishiInit.getInitData();
  }
}

let redirectToRoot = (nextState) => {
  replaceState({ nextPathname: nextState.location.pathname }, '/')
}

ReactDOM.render(
  (<Router history={createBrowserHistory()}>
    <Route path="/logout" onEnter={log_out} />

    <Route path="/login" component={Login} onEnter={user_logged_out} >
    <Route path='/login/auth' onEnter={SignUpUser} />
    </Route>
    <Route path="/" component={Zhishi} onEnter={user_logged_in} >


      <IndexRoute component={Home} onEnter={initData} />
      <Route path="/search" component={Search} />
      <Route path="/users" component={Users} >
        <Route path="/users" component={UsersIndex} />
        <Route path="/users/:id" component={User} />
      </Route>

      <Route path="/questions" component={Questions}  onEnter={user_logged_in}>
        <IndexRoute component={QuestionIndex} onEnter={user_logged_in} />
        <Route path="/questions/new" component={NewQuestion} />
        <Route path="/questions/:id" component={Question}  />
      </Route>

      <Route path="*" component={Zhishi} onEnter={user_logged_in}/>

    </Route>
  </Router>),
  document.getElementById('app')
);
