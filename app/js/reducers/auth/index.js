import {combineReducers} from 'redux';
import currentUser from './currentUserReducer';
import isLoggedInToAndela from './isLoggedInToAndelaReducer';

const questionReducer = combineReducers({
  currentUser,
  isLoggedInToAndela
});

export default questionReducer;
