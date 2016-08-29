import types from '../constants/auth/actionTypes';
import webAPI from './../utils/webAPI.js';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

// import $ from 'jquery';

/* eslint-disable camelcase */

/**
* @param {Object} user to be set as current user
* @return {Object} same as edit
*/
export function loadCurrentUserSuccess(user) {
  return ({type: types.LOAD_CURRENT_USER_SUCCESS, user});
}

/**
* @param {Object} isFirstLogin to be set as current user
* @return {Object} same as edit
*/
export function hasLoggedInToday(loggedInToday) {
  return ({type: types.HAS_LOGGED_IN_TODAY, loggedInToday});
}

/**
* @param {Object} user to be set as current user
* @return {Object} same as edit
*/
export function logoutUser(user) {
  return ({type: types.LOGOUT_USER_SUCCESS, user});
}

/**
* @param {Object} resourceId: id of the comment resource (question or answer)
* @param {Object} id: of the comment
* @return {Func}  Success action to Comment reducer
*/
export function loginUser({temp_token}) {
  return dispatch => {
    dispatch(beginAjaxCall());
    dispatch(hasLoggedInToday(true));
    return webAPI(`/validate_token`, 'POST', {temp_token})
      .then(user => {
        dispatch(loadCurrentUserSuccess(user));
      })
      .catch(error => {
        dispatch(ajaxCallError());
        throw (error);
      });
  };
}
