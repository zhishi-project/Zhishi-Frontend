import types from '../../constants/search/actionTypes';
import * as storeHelpers from './storeHelpers.js';

const initialState = [];

/**
* @param {Object} state: json object of questions
* @param {Object} action Identical to state
* @return {object} the state is returned
*/
export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_SEARCH_SUCCESS:
      return storeHelpers.loadSearchResult(state, action.results);

    default:
      return state;
  }
}
