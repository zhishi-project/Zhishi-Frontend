import {combineReducers} from 'redux';
import currentUser from './currentUserReducer';
import hasLoggedInToday from './hasLoggedInTodayReducer';

const questionReducer = combineReducers({
  currentUser,
  hasLoggedInToday
});

export default questionReducer;
