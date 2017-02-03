import React from 'react'; // eslint-disable-line no-unused-vars
import {render} from 'react-dom';
import {Router} from 'react-router';
import routes from './routes';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import * as ZhishiInit from './utils/ZhishiInit.js';
import Raven from 'raven-js';

Raven.config(process.env.SENTRY_DSN).install();
import store from './stores/configureStore';
import {Provider} from 'react-redux';

const checked = store.getState().auth.isLoggedInToAndela;
if (location.pathname === '/login' && !checked) {
  ZhishiInit.checkAndelaLoggedIn(store);
  // ZhishiInit.loadData(store);
} else {
  ZhishiInit.loadData(store);
}

let history = createBrowserHistory();

history.listen(function(location) {
  window.ga('create', 'UA-76284809-1', 'auto');
  window.ga('send', 'pageview', location.pathname);
});

if (process.env.NODE_ENV === 'production') {
  try {
    render(
      <Provider store={store} >
        <Router history={history} routes={routes} />
      </Provider>,
      document.getElementById('app')
    );
  } catch (exception) {
    Raven.captureException(exception);
  }
} else {
  render(
    <Provider store={store} >
      <Router history={history} routes={routes} />
    </Provider>,
    document.getElementById('app')
  );
}
