import * as questionActions from '../actions/QuestionActions.js';
import * as authActions from '../actions/AuthActions.js';
import Auth from '../auth';
import isEmpty from './isEmpty';
import store from '../stores/configureStore'


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

export function getQuestions(page, tags) {
	const abc = questionActions.loadQuestions(page, tags);
	console.log('The action was called');
	abc(store.dispatch);
}