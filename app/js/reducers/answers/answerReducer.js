import questionTypes from '../../constants/questions/actionTypes';
import answerTypes from '../../constants/answers/actionTypes';
import * as storeHelper from './storeHelpers';

const initialState = {};

/**
* @param {Object} state: json object of questions
* @param {Object} action Identical to state
* @return {object} the state is returned
*/
export default function answerReducer(state = initialState, action) {
  switch (action.type) {
    case questionTypes.LOAD_ANSWERS_SUCCESS:
      return storeHelper.loadAnswersFromQuestion(action.question);

    case questionTypes.LOAD_QUESTION_SUCCESS:
      return storeHelper.loadAnswersFromQuestion(state, action.question);

    case answerTypes.EDIT_ANSWER:
      return storeHelper.edit(state, action.data);

    case answerTypes.LOAD_ANSWER_SUCCESS:
      return storeHelper.updateAnswer(state, action.data);

    case answerTypes.ANSWER_UPDATE_VOTES:
      return storeHelper.update_votes_count(action.data);

    case answerTypes.UPDATE_ANSWER_VOTE_SUCCESS:
      return storeHelper.updateVotesCount(state, action.data);

    default:
      return state;
  }
}
