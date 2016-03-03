var AuthActions;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var ZhishiConstants = require('../constants/ZhishiConstants');

import CookieVar from '../config/CookieVariables.js'

AuthActions = {

  // Receive inital product data

  loginUser: function(data) {
    if (data._error) {
      AppDispatcher.dispatch({
        actionType: ZhishiConstants.AUTH_LOG_IN_ERROR,
        data: data
      });
    } else if (data) {
      AppDispatcher.dispatch({
        actionType: ZhishiConstants.AUTH_LOG_IN,
        data: data
      });
    }
    AuthActions.redirectToReferrerIfAny()
  },

  logoutUser: function() {

    AppDispatcher.dispatch({
      actionType: ZhishiConstants.AUTH_LOG_OUT
    })
  },

  signupUser: function(id, data) {
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.AUTH_SIGN_UP,
      id: id,
      data: data
    });
  },

  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.USER_DESTROY,
      id: id
    });
  },

  /**
   * Delete all the completed Users
   */
  destroyCompleted: function() {
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.USER_DESTROY_COMPLETED
    });
  },

  redirectToReferrerIfAny: (nextState, replaceState) => {
    if ($.cookie(CookieVar.referrer)) {
      var referrer = $.cookie(CookieVar.referrer)
      $.removeCookie(CookieVar.referrer)
      window.location.href = referrer;
    } else {
      window.location.href = '/'
    }
  }

};

module.exports = AuthActions;
