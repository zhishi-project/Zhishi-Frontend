import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events'
import ZhishiConstants from '../constants/ZhishiConstants';
import assign from 'object-assign';
import CVar from "../config/CookieVariables.js";

var CHANGE_EVENT = 'change';

let _shown_form = "login", _error_msg = "";

function setShownForm(text) {
  _shown_form = text;
}

function setCurrentUser(user) {
  let cookie_meta = get_cookie_meta();
  user = (typeof user === 'object') ? JSON.stringify(user) : user
  $.cookie(CVar.current_user, user, cookie_meta);
  $.cookie(CVar.user_logged_in, (userToken() ? true : false), cookie_meta);
}

function userToken(){
  return currentUser().api_key
}

let currentUser = () => {
  let current_user =  $.cookie(CVar.current_user) || {}
  return typeof current_user === 'object'
          ? current_user
          : parseUser(current_user)
}

let parseUser = (user) => {
  return typeof user === 'object'
  ? user
  : parseUser( JSON.parse(user) )
}

let setErrorMessage = (_error) => {
  _error_msg = "Invalid details. Please cross-check";
}

let setUserLoginStatus = (status) => {
  $.cookie(CVar.user_logged_in, status);
}


let logoutUser = () => {
  $.removeCookie(CVar.current_user);
  $.removeCookie(CVar.user_logged_in);
}

let get_cookie_meta = () => {
  var currentDate = new Date();
  var expirationDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()+1,
    0, 0, 0);
  return {path: '/', expires: expirationDate}
}

let setFirstTimeMarker = (bool) => {
  $.cookie(CVar.first_time_marker, bool, get_cookie_meta());
}

var AuthStore = assign({}, EventEmitter.prototype, {

  getShownForm: () => {
    return _shown_form;
  },

  getCurrentUser: () => {
    return currentUser()
  },

  getCurrentUserToken: () => {
    return userToken();
  },

  getFirstTimeMarker: () => {
    return $.cookie(CVar.first_time_marker)
  },

  getErrorMessage: function(){
    var _msg = _error_msg
    _error_msg = "";
    return _msg;
  },

  userLoggedIn: function() {
    return $.cookie(CVar.user_logged_in) ;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AuthStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.actionType) {

    case ZhishiConstants.AUTH_FORM_SELECTED:
      setShownForm(action.data);
      AuthStore.emitChange();
      break;

    case ZhishiConstants.AUTH_LOG_IN:
      if (!AuthStore.userLoggedIn() && action.data) {
        setCurrentUser(action.data);
      }
      break;

    case ZhishiConstants.CURRENT_USER_UPDATE:
      setCurrentUser(action.data)
      AuthStore.emitChange();
      break;

    case ZhishiConstants.AUTH_LOG_IN_ERROR:
      setErrorMessage(action._error)
      AuthStore.emitChange();
      break;

    case ZhishiConstants.FIRST_TIME_LOGIN_TODAY:
      setFirstTimeMarker(action.data);
      AuthStore.emitChange();
      break;

    case ZhishiConstants.AUTH_LOG_OUT:
      logoutUser();
      break;

    default:
      // nothing for now
  }
});

module.exports = AuthStore;
