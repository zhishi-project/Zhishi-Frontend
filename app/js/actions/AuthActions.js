import types from '../constants/auth/actionTypes';
import webAPI from './../utils/webAPI.js';
import CookieVar from '../config/CookieVariables.js';

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
export function setFirstTimeMarker(isFirstLogin) {
  return ({type: types.FIRST_TIME_LOGIN_TODAY, isFirstLogin});
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
    return webAPI(`/validate_token`, 'POST', {temp_token})
      .then(user => {
        dispatch(loadCurrentUserSuccess(user));
      });
  };
}

function redirectToReferrerIfAny() {
  if ($.cookie(CookieVar.referrer)) {
    var referrer = $.cookie(CookieVar.referrer);
    $.removeCookie(CookieVar.referrer);
    window.location.href = referrer;
  } else {
    window.location.href = '/';
  }
}

let AuthActions = {
  // Receive inital product data

};
