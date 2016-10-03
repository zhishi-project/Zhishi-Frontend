import React from 'react'; // eslint-disable-line no-unused-vars
import createBrowserHistory from 'history/lib/createBrowserHistory';

let history = createBrowserHistory();

history.listen(function(location) {
  window.ga('create', 'UA-76284809-1', 'auto');
  window.ga('send', 'pageview', location.pathname);
});

export default history;
