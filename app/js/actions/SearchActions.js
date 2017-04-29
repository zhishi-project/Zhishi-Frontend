import types from '../constants/search/actionTypes';
import * as webAPI from './../utils/webAPI.js';

/**
* @param {Object} data: info containing total votes and resource vote belongs
* @return {Object} containing the action type and data
*/
export function loadSearchSuccess(results) {
  return {type: types.LOAD_SEARCH_SUCCESS, results};
}

/**
* @param {Object} searchQuery: text to search for
* @return {Object} containing the action type and data
*/
export function search(searchQuery) {
  return dispatch => {
    return webAPI.processRequest('/questions/search', 'GET',
    {q: searchQuery.trim()})
    .then(response => {
      dispatch(loadSearchSuccess(response.questions));
    });
  };
}
