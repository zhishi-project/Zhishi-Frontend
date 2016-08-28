import types from '../constants/search/actionTypes';
import webAPI from '../utils/webAPI.js';

/**
* @param {Object} data: info containing total votes and resource vote belongs
* @return {Object} containing the action type and data
*/
export function loadSearchSuccess(data) {
  return {type: types.LOAD_SEARCH_SUCCESS, data};
}

/**
* @param {Object} searchQuery: text to search for
* @return {Object} containing the action type and data
*/
export function search(searchQuery) {
  return dispatch => {
    return webAPI('/questions/search', 'GET', searchQuery)
    .then(response => {
      dispatch(loadSearchSuccess(response));
    });
  };
}
