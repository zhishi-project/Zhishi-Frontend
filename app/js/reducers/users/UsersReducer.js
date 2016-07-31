import questionTypes from '../../constants/questions/actionTypes';
import types from '../../constants/comments/actionTypes';
import * as storeHelper from './storeHelpers';

const initialState = {};

/**
* @param {Object} state: json object of questions
* @param {Object} action Identical to state
* @return {object} the state is returned
*/
export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case questionTypes.LOAD_USERS_SUCCESS:
      return storeHelper.loadAllUsers(state, action.users);

    case types.LOAD_USER_SUCCESS:
      return storeHelper.updateUser(state, action.user);

    default:
      return state;
  }
}
