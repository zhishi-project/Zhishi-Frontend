import fetch from 'isomorphic-fetch';
import types from '../constants/users/actionTypes';
import webAPI from './../utils/webAPI.js';

const loadUserSuccess = user => {
  return {type: types.LOAD_USER_SUCCESS, user};
};

/**
* @param {Integer} userId - of the user whose profile is checked
* @return {Func} callback promise
*/
export function loadUser(userId) {
  return dispatch => {
    return webAPI(`/users/${userId}`, 'GET')
      .then(user => {
        dispatch(loadUserSuccess(user));
      });
  };
}

/**
 * toggleSlackNotifications
 * @desc This changes the status of the slack notification
 * @param {Object} currentUser - The current user details
 * @param {Boolean} status - The could be true/false
 * @return {Func} callback promise
 */
export function toggleSlackNotifications(currentUser, status) {
  console.log(process.env.ZI_NOTIFI_URL, 'notify url');
  const body = JSON.stringify({status});
  return fetch({
    url: `/users/${currentUser.id}/preference`,
    baseUrl: process.env.ZI_NOTIFI_URL,
    body,
    method: 'POST',
    headers: {
      Authorization: `Token token=${currentUser.apiKey}`
    }
  });
}
