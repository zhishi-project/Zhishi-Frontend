import React from "react";
import ReactDOM from "react-dom";
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, Route, IndexRoute, Link, Redirect, IndexLink } from 'react-router'


import ZhishiInit from './utils/ZhishiInit.js';
import Zhishi from './components/Zhishi.react';
import Login from './components/Login.react';

// API call to get initial data
// ZhishiInit.getInitData();


ReactDOM.render(
  (<Router history={createBrowserHistory()}>
    <Route name="app" path="/" component={Zhishi}>
      <IndexRoute component={Zhishi} />
      <Redirect from="/" to="/login" />
      <Route path="/login" component={Login} />
      <Route path="*" component={Zhishi} />
    </Route>
  </Router>),
  document.getElementById('app')
);
