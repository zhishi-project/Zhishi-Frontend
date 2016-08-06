import types from '../../constants/questions/actionTypes';
import Common from '../../utils/Common';

const loadTopQuestionsSuccess = topQuestions => {
  return Common.serializeByKey(topQuestions);
};

/**
* @param {Object} state def state
* @param {action} action an object of questions
* @return {Object} topQuestion as all top questions
*/
export default function questionReducer(state = {}, action) {
  switch (action.type) {
    case types.LOAD_TOP_QUESTIONS_SUCCESS:
      return loadTopQuestionsSuccess(action.data.questions);

    default:
      return state;
  }
}
