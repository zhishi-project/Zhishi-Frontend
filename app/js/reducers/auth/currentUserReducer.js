import types from '../../constants/auth/actionTypes';
import Auth from '../../auth';

const initialState = {};

/**
* @param {Object} state: json object of questions
* @param {Object} action Identical to state
* @return {object} the state is returned
*/
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_CURRENT_USER_SUCCESS:
      return Auth.setCurrentUser(state, action.user);

    case types.LOAD_USER_FROM_COOKIE:
      return Auth.getCurrentUser();

    case types.LOGOUT_USER_SUCCESS:
      Auth.logoutUser();
      return state;

    default:
      return state;
  }
}
