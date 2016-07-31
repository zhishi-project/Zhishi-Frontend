import {combineReducers} from 'redux';
import questions from './questions';
import answers from './answers/answerReducer';
import comments from './comments/commentReducer';
import users from './users/usersReducer';
import currentUser from './auth/authReducer';
import activities from './activities';
import display from './display';

const rootReducer = combineReducers({
  questions,
  answers,
  comments,
  users,
  activities,
  currentUser,
  display
});

export default rootReducer;
