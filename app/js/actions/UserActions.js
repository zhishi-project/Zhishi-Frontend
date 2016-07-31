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
    return webAPI(`/users/${userId}`, 'GET', null)
      .then(user => {
        dispatch(loadUserSuccess({user}));
      });
  };
}
