import types from '../../constants/activities/actionTypes';
import * as storeHelper from './storeHelpers';

const initialState = {};

/**
* @param {Object} state: json object of questions
* @param {Object} action Identical to state
* @return {object} the state is returned
*/
export default function answerReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_ACTIVITIES_SUCCESS:
      return storeHelper.loadActivities(action.activities);

    default:
      return state;
  }
}
