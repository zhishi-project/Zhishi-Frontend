import types from '../../constants/questions/actionTypes';
import * as storeHelper from './storeHelpers';

const initialState = {};

/**
* @param {Object} state json object of questions
* @param {Object} action Identical to state
* @return {object} the state is returned
*/
export default function questionReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_QUESTIONS_SUCCESS:
      if (action.data.questions) {
        const newState = storeHelper.loadQuestions({}, action.data.questions);
        return newState;
      }
      return state;

    case types.EDIT_QUESTION:
      return storeHelper.edit(state, action.data);

    case types.LOAD_QUESTION_SUCCESS:
      return storeHelper.updateQuestion(state, action.question);

    case types.UPDATE_QUESTION_VOTE_SUCCESS:
      return storeHelper.updateVotesCount(state, action.data);

    default:
      return state;
  }
}
