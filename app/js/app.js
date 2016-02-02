import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, Route, IndexRoute, Link, IndexLink } from 'react-router'


import ZhishiInit from './utils/ZhishiInit.js';
import AuthStore from './stores/AuthStore.js';
import AuthActions from './actions/AuthActions.js'
import webAPI from './utils/webAPI.js'

import Zhishi from './components/Zhishi.react';
import Home from './components/Home.react';
import Login from './components/Login.react';

$.cookie.json = true
// make api call if user is logged in
if (!$.isEmptyObject(AuthStore.getCurrentUser)) { ZhishiInit.getInitData(); }


let user_logged_in = function(nextState, replaceState) {
  if (!AuthStore.userLoggedIn()) {
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


ReactDOM.render(
  (<Router history={createBrowserHistory()}>
    <Route path="/login" component={Login} onEnter={user_logged_out} >
      <Route path='/login/auth' onEnter={SignUpUser} />
    </Route>
    <Route path="/logout" onEnter={log_out} />

    <Route path="/" component={Zhishi} onEnter={user_logged_in}>

      <IndexRoute component={Home}  />

      <Route path="/users" component={Login} >
        <Route path="/users/:id" component={Login} />
      </Route>

      <Route path="*" component={Zhishi} />

    </Route>
  </Router>),
  document.getElementById('app')
);
