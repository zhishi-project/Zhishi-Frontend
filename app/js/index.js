import React from 'react'; // eslint-disable-line no-unused-vars
import {render} from 'react-dom';
import {Router} from 'react-router';
import routes from './routes';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import * as ZhishiInit from './utils/ZhishiInit.js';

import configureStore from './stores/configureStore';
import {Provider} from 'react-redux';

let history = createBrowserHistory();

history.listen(function(location) {
  window.ga('create', 'UA-76284809-1', 'auto');
  window.ga('send', 'pageview', location.pathname);
});

let store = configureStore();
ZhishiInit.loadData(store);

render(
  <Provider store={store} >
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
