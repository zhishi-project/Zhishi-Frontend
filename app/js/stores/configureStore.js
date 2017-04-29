import {createStore, applyMiddleware} from 'redux';
import bugsnagMiddleware from 'redux-bugsnag-middleware';
import Bugsnag from 'bugsnag-js';
import cookie from 'js-cookie';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import CVar from '../config/CookieVariables';
import rootReducer from '../reducers';

if (process.env.NODE_ENV === 'production') {
  Bugsnag.apiKey = cookie.get(CVar.bugsnag);
}
const middleware = process.env.NODE_ENV === 'production' ?
  [bugsnagMiddleware(), thunk] : [reduxImmutableStateInvariant(), thunk];

const configureStore = initialState => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  );
};

export default configureStore();
