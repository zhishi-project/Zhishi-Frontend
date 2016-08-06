import {combineReducers} from 'redux';
import activities from './activityReducer';

const activitiesReducer = combineReducers({
  activities
});

export default activitiesReducer;
