import types from '../../constants/tags/actionTypes';
import * as storeHelpers from './storeHelpers.js';

const initialState = {};

/**
* @param {Object} state: json object of questions
* @param {Object} action Identical to state
* @return {object} the state is returned
*/
export default function tagReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_TAGS_SUCCESS:
      return storeHelpers.loadTags(state, action.tags);

    case types.SELECT_TAG_FOR_SUBSCRIPTION:
      return storeHelpers.changeTagStatus(state, action.tag);
    default:
      return state;
  }
}
