import React from 'react'; // eslint-disable-line no-unused-vars
import {Route, IndexRoute} from 'react-router';

import CookieVar from './config/CookieVariables.js';
import * as format from './utils/stringFormatters';

import Zhishi from './components/Zhishi.react';
import Home from './components/home/Index.react';
import Search from './components/search/Index.react';
import Login from './components/Login.react';
import Users from './components/users/Users.react';
import UsersIndex from './components/users/Index.react';
import User from './components/users/Show.react';
import Questions from './components/questions/Question.react';
import NewQuestion from './components/questions/new/Index.react';
import Question from './components/questions/Show.react';
import Auth from './auth';
import PageNotFound from './components/page_not_found/PageNotFound.react.js';


import store from './stores/configureStore';
import * as authActions from './actions/AuthActions.js';
import * as ZhishiInit from './utils/ZhishiInit.js';

import cookie from 'js-cookie';

const redirectToReferrerIfAny = (nextState, replaceState) => {
  let path = '';
  if (cookie.get(CookieVar.referrer)) {
    var referrer = cookie.get(CookieVar.referrer);
    cookie.remove(CookieVar.referrer);
    path = referrer;
  } else {
    path = '/';
  }

  replaceState({
    nextPathname: nextState.location.pathname
  }, path);
};

const stripNameFromUrl = (pathname) => {
  const value = pathname.replace(/[/]/g, ' ').trim().split(' ');
  return value[0];
}

const checkIfExist = (url, id, nextState, replaceState) => {
const deee = `${process.env.ENGINE_HOST}/${url}/${id}`;
    $.ajax({
      method:'GET',
      url: `${process.env.ENGINE_HOST}/${url}/${id}`,
      headers: {
        Authorization: `Bearer ${cookie.get(CookieVar.jwt)}`
      }
    }).fail((err) => {
      if (err.status === 404) {
        window.location = '/not-found';
        // return replaceState({
        //   nextPathname: nextState.location.pathname
        // }, '/not-found');
      }
    })
}

const  validateId = (nextState, replaceState) => {
  const params = nextState.params.id;
  const id = format.getIdFromPermalink(params);
  const pathname = nextState.location.pathname;
  const url = stripNameFromUrl(pathname);
  checkIfExist(url, id, nextState, replaceState);
}
 
// const redirectIfNotFound = () => {
//   this.props.history.push('/not-found');
// }

let userLoggedIn = function(nextState, replaceState) {
  if (!Auth.userLoggedIn()) {
    cookie.set(CookieVar.referrer, nextState.location.pathname, {
      path: '/'
    });
    replaceState({
      nextPathname: nextState.location.pathname
    }, '/login');
  }
};

const checkIfLoggedIn = (nextState, replaceState) => {
  if (!Auth.userLoggedIn()) {
    return replaceState({
      nextPathname: nextState.location.pathname
    }, '/login');
  }
  replaceState({
    nextPathname: nextState.location.pathname
  }, '/not-found');
}

let redirectToRoot = (nextState, replaceState) => {
  // replaceState({
  //   nextPathname: nextState.location.pathname
  // }, '/');
  window.location = '/';
};

let userLoggedOut = function(nextState, replaceState) {
  if (Auth.userLoggedIn()) {
    redirectToRoot(nextState, replaceState);
  }
};

let logOut = function(nextState, replaceState, done) {
  store.dispatch(authActions.logoutUser());
  replaceState({
    nextPathname: nextState.location.pathname
  }, '/login');
  done();
};

let logIn = (nextState, replaceState, done) => {
  store.dispatch(authActions.loginUser())
    .then(() => {
      ZhishiInit.loadData(store);
      redirectToReferrerIfAny(nextState, replaceState);
      done();
    });
};

export default (
  <Route >
    <Route path="/login" component={Login} onEnter={userLoggedOut} />
    <Route path="/login/auth" onEnter={logIn} />
    <Route path="/logout" onEnter={logOut} />

    <Route path="/" component={Zhishi} onEnter={userLoggedIn} >
      <IndexRoute component={Home} />

      <Route path="/search" component={Search} />
      <Route path="/users" component={Users} >
        <Route path="/users" component={UsersIndex} />
        <Route path="/users/:id" component={User}  onEnter={validateId}/>
      </Route>

      <Route path="/questions" component={Questions} onEnter={userLoggedIn}>
        <IndexRoute component={Zhishi} />
        <Route path="/questions/new" component={NewQuestion} />
        <Route path="/questions/:id" component={Question} onEnter={validateId} />
      </Route>


    </Route>
    <Route path="/not-found" component={PageNotFound}/>
    <Route path="*" component={PageNotFound} onEnter={checkIfLoggedIn}/>
  </Route>
);
