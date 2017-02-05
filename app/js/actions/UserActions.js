import types from '../constants/users/actionTypes';
import Auth from '../auth';
import * as webAPI from './../utils/webAPI.js';

const loadUserSuccess = user => {
  return {type: types.LOAD_USER_SUCCESS, user};
};

const loadUserPreferences = preference => {
  return {type: types.LOAD_USER_PREFERENCES, preference};
};

const updateUserPreference = preference => {
  return {type: types.UPDATE_USER_PREFERENCE, preference};
};

/**
* @param {Integer} userId - of the user whose profile is checked
* @return {Func} callback promise
*/
export function loadUser(userId) {
  return dispatch => {
    return webAPI.processRequest(`/users/${userId}`, 'GET')
      .then(user => {
        dispatch(loadUserSuccess(user));
      });
  };
}

/**
 * loadUserPreference
 * @desc This changes the status of the slack notification
 * @param {Object} currentUser - The current user details
 * @return {Func} callback promise
 */
export function loadUserPreference(currentUser) {
  const url = `${process.env.ZI_NOTIFY_URL}/user/${currentUser.id}/preference`;
  return dispatch => {
    return webAPI.processUserPreference(url, currentUser.token, 'GET')
    .then(response => {
      if (response.status === 401) {
        throw new Error('You are unauthorized');
      }
      console.log(response, 'preference');
      dispatch(loadUserPreferences(response));
    });
  };
}

/**
 * toggleUserPreference
 * @desc This changes the status of the slack notification
 * @param {Object} currentUser - The current user details
 * @param {Object} userPreference - The current state of the user's preference
 * @param {String} preference - The name of the preference e.g slack, email
 * @param {Boolean} status - The could be true/false
 * @return {Func} callback promise
 */
export function toggleUserPreference(currentUser, userPreference,
  preference, status) {
  console.log('got here', status, preference);
  const url = `${process.env.ZI_NOTIFY_URL}/user/${currentUser.id}/preference`;
  let body = {};
  body[preference] = status;
  userPreference[preference] = status;

  return dispatch => {
    return webAPI.processUserPreference(url, currentUser.token, 'PUT', body)
    .then(response => {
      if (response.status === 401) {
        throw new Error('You are unauthorized');
      }
      dispatch(updateUserPreference(userPreference));
    });
  };
}
