import questionTypes from '../../constants/questions/actionTypes';
import types from '../../constants/comments/actionTypes';
import * as storeHelper from './storeHelpers';

const initialState = {questions: {}, answers: {}};

/**
* @param {Object} state: json object of questions
* @param {Object} action Identical to state
* @return {object} the state is returned
*/
export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case questionTypes.LOAD_QUESTION_SUCCESS:
      return storeHelper.loadAllComments(state, action.question);

    case types.LOAD_COMMENT_SUCCESS:
      return storeHelper.updateComment(state, action.data);

    case types.EDIT_COMMENT:
      return storeHelper.edit(state, action.data);

    case types.CANCEL_COMMENT_EDIT:
      return storeHelper.cancelEdit(state, action.data);

    case types.UPDATE_COMMENT_VOTE_SUCCESS:
      return storeHelper.updateVotesCount(state, action.data);

    case types.COMMENT_INDEX:
      return storeHelper.loadAllComments(state, action.data);

    default:
      return state;
  }
}
