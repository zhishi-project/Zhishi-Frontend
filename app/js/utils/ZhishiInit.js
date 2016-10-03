import * as questionActions from '../actions/QuestionActions.js';
import * as authActions from '../actions/AuthActions.js';
import Auth from '../auth';
import isEmpty from './isEmpty';

export function loadData(store) {
  let currentUser = Auth.getCurrentUser();
  if (!isEmpty(currentUser)) {
    store.dispatch(questionActions.loadQuestions());
    store.dispatch(questionActions.loadTopQuestions());
    store.dispatch(authActions.loadCurrentUserSuccess(currentUser));
  }
}

export function checkAndelaLoggedIn(store) {
  store.dispatch(authActions.loginUser());
}
