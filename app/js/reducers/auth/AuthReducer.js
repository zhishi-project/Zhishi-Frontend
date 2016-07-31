import questionTypes from '../../constants/questions/actionTypes';
import types from '../../constants/comments/actionTypes';
import Auth from '../../auth';

const initialState = {questions: {}, answers: {}};

/**
* @param {Object} state: json object of questions
* @param {Object} action Identical to state
* @return {object} the state is returned
*/
export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case questionTypes.LOGIN_USER_SUCCESS:
      return Auth.setCurrentUser(state, action.user);

    case types.LOAD_USER_FROM_COOKIE:
      return Auth.getCurrentUser();

    default:
      return state;
  }
}
