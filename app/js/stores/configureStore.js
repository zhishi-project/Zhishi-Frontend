import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import ravenMiddleware from 'redux-raven-middleware';

const middleware = process.env.NODE_ENV === 'production' ?
  [ravenMiddleware(process.env.SENTRY_DSN), thunk] :
  [reduxImmutableStateInvariant(), thunk];

const configureStore = initialState => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  );
};

export default configureStore();
