import types from '../../constants/questions/actionTypes';
import Common from '../../utils/Common';

const initialState = {};

const filterQuestionsWithTags = questions => {
  return Common.serializeByKey(questions);
};

/**
* @param {Obj} state: def state
* @param {action} action: an object of questions
* @return {Object} as all top questions
*/
export default function userQuestionReducer(state = initialState, action) {
  switch (action.type) {
    case types.FILTER_QUESTIONS_WITH_TAGS:
      return filterQuestionsWithTags(action.data.questions);

    default:
      return state;
  }
}
