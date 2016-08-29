import types from '../../constants/tags/actionTypes';
import authTypes from '../../constants/auth/actionTypes';
import * as storeHelpers from './storeHelpers.js';

const initialState = [];

/**
* @param {Object} state: json object of questions
* @param {Object} action Identical to state
* @return {object} the state is returned
*/
export default function selectedTagReducer(state = initialState, action) {
  switch (action.type) {
    case authTypes.LOAD_CURRENT_USER_SUCCESS:
      return storeHelpers.loadUserSusbcribedTags(state, action.user.tags);

    case types.SELECT_TAG_FOR_SUBSCRIPTION:
      return storeHelpers.selectTagForSubscription(state, action.tag.name);

    default:
      return state;
  }
}
