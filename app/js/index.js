import React from 'react'; // eslint-disable-line no-unused-vars
import {render} from 'react-dom';
import {Router} from 'react-router';
import routes from './routes';
import history from './history';
import * as ZhishiInit from './utils/ZhishiInit.js';

import store from './stores/configureStore';
import {Provider} from 'react-redux';

const checked = store.getState().auth.isLoggedInToAndela;
if (location.pathname === '/login' && !checked) {
  ZhishiInit.checkAndelaLoggedIn(store);
  // ZhishiInit.loadData(store);
} else {
  ZhishiInit.loadData(store);
}

render(
  <Provider store={store} >
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
