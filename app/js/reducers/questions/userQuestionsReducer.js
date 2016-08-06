import types from '../../constants/questions/actionTypes';

/**
* @param {Obj} state def state
* @param {action} action an object of questions
* @return {Object} as all top questions
*/
export default function userQuestionReducer(state = {}, action) {
  switch (action.type) {
    case types.LOAD_USER_QUESTIONS_SUCCESS:
      return action.questions;

    default:
      return state;
  }
}
