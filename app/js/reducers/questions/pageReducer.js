import types from '../../constants/questions/actionTypes';
import assign from 'object-assign';

/* eslint-env es6*/

const initialState = {
  pageMapping: {},
  shouldFetch: true,
  currentPage: 1
};

/**
* @param {Object} questions : a JSON object of questions
* @param {Object} page : represents current state of pageReducer
* @return {Array} returns an array of pageMapping
*/
const createPageMapping = (state, questions, currentPage) => {
  let questionIds = [];
  let pageMapping = {};
  for (var i = 0; i < questions.length; i++) {
    questionIds.push(questions[i].id);
  }
  pageMapping[currentPage] = questionIds;
  return assign({}, state, {
    pageMapping,
    currentPage
  });
};

/**
 * @param {Object} state : new state
 * @param {Object} action: hash of questions and currentPage
 * @return {Array} it returns the state of mapping
*/
export default function pageReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_QUESTIONS_SUCCESS:
      if (action.data.questions) {
        const {questions, currentPage} = action.data;
        return createPageMapping(state, questions, currentPage);
      }
      return assign({}, state, {
        shouldFetch: false
      });

    default:
      return state;
  }
}
