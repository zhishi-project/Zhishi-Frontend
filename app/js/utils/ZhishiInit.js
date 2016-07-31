import * as actions from '../actions/QuestionActions.js';

export function loadData(store) {
  store.dispatch(actions.loadQuestions());
  store.dispatch(actions.loadTopQuestions());
}
