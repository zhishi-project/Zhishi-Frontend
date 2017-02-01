import fetch from 'isomorphic-fetch';
import types from '../constants/users/actionTypes';
import Auth from '../auth';
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
 * @param {String} preference - The name of the preference e.g slack, email
 * @param {Boolean} status - The could be true/false
 * @return {Func} callback promise
 */
export function toggleUserPreference(currentUser, preference, status) {
  const url = `${process.env.ZI_NOTIFY_URL}/user/${currentUser.id}/preference`;
  const body = JSON.stringify({preference: status});
  return fetch(url, {
    baseUrl: process.env.ZI_NOTIFY_URL,
    method: 'GET',
    headers: {
      Authorization: `Token token=${currentUser.apiKey}`
    }
  }).then(response => {
    console.log(response, 'preference');
    // if (response)
  }).catch(err => {
    console.log(err, 'error');
  });
}
