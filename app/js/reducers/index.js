import {combineReducers} from 'redux';
import answers from './answers/answerReducer';
import comments from './comments/commentReducer';
import users from './users/userReducer';
import questions from './questions';
import activities from './activities';
import auth from './auth';
import display from './display';
import tags from './tags';
import ajaxStatus from './ajaxStatusReducer';
import searchResults from './search/searchReducer';

const rootReducer = combineReducers({
  questions,
  answers,
  comments,
  users,
  activities,
  auth,
  display,
  tags,
  searchResults,
  ajaxStatus
});

export default rootReducer;
