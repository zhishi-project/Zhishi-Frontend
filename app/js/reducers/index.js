import {combineReducers} from 'redux';
import questions from './questions';
import answers from './answers/answerReducer';
import comments from './comments/commentReducer';
import users from './users/userReducer';
import currentUser from './auth/authReducer';
import activities from './activities';
import display from './display';
import tags from './tags';

const rootReducer = combineReducers({
  questions,
  answers,
  comments,
  users,
  activities,
  currentUser,
  display,
  tags
});

export default rootReducer;
