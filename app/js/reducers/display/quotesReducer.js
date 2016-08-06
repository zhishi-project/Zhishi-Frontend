import types from '../../constants/display/actionTypes';

const initialState = [];

/**
* @param {Object} state: json object of questions
* @param {Object} action Identical to state
* @return {object} the state is returned
*/
export default function answerReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_QUOTES_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.quotes)
      ];

    default:
      return state;
  }
}
