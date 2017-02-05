import types from '../../constants/users/actionTypes';
import * as storeHelper from './storeHelpers';

const initialState = {};

/**
* @param {Object} state: json object of questions
* @param {Object} action Identical to state
* @return {object} the state is returned
*/
export default function userReducer(state = initialState, action) {
  console.log(state, 'user state');
  switch (action.type) {
    case types.LOAD_USERS_SUCCESS:
      return storeHelper.loadAllUsers(state, action.users);

    case types.LOAD_USER_SUCCESS:
      return storeHelper.updateUser(state, action.user);

    case types.LOAD_USER_PREFERENCES:
      return action.preferences;

    case types.UPDATE_USER_PREFERENCE:
      return [
        ...state,
        Object.assign(action.preferences)
      ];

    default:
      return state;
  }
}
