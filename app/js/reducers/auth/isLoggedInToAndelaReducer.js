import types from '../../constants/auth/actionTypes';

const initialState = false;

/**
* @param {Object} state: json object of questions
* @param {Object} action Identical to state
* @return {object} the state is returned
*/
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.CHECK_LOGGED_IN_TO_ANDELA:
      return true;
    default:
      return state;
  }
}
