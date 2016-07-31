import {combineReducers} from 'redux';
import questions from './questionReducer';
import topQuestions from './topQuestionsReducer';
import userQuestions from './userQuestionsReducer';
import filteredQuestions from './filteredQuestionsReducer';
import page from './pageReducer';

const questionReducer = combineReducers({
  questions,
  topQuestions,
  page,
  filteredQuestions,
  userQuestions
});

export default questionReducer;
