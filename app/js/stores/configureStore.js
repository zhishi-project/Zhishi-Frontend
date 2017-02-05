import {createStore, applyMiddleware} from 'redux';
import bugsnagMiddleware from 'redux-bugsnag-middleware';
import Bugsnag from 'bugsnag-js';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

Bugsnag.apiKey = process.env.BUGSNAG_API;
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
