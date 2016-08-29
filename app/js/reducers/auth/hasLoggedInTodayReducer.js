import types from '../../constants/auth/actionTypes';
import Auth from '../../auth';

const initialState = false;

/**
* @param {Object} state: json object of questions
* @param {Object} action Identical to state
* @return {object} the state is returned
*/
export default function authReducer(state = initialState, action) {
  switch (action.type) {

    case types.HAS_LOGGED_IN_TODAY:
      return Auth.setLoggedInToday(action.loggedInToday);

    default:
      return state;
  }
}
