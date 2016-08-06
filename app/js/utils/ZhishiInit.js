import * as questionActions from '../actions/QuestionActions.js';
import * as authActions from '../actions/AuthActions.js';
import Auth from '../auth';

export function loadData(store) {
  let currentUser = Auth.getCurrentUser();
  if (currentUser && !Object.is({}, currentUser)) {
    store.dispatch(questionActions.loadQuestions());
    store.dispatch(questionActions.loadTopQuestions());
    store.dispatch(authActions.loadCurrentUserSuccess(currentUser));
  }
}
