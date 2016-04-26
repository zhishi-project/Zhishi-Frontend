import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events'
import ZhishiConstants from '../constants/ZhishiConstants';
import assign from 'object-assign';
import CVar from "../config/CookieVariables.js"
var CHANGE_EVENT = 'change';

let _shown_form = "login", _error_msg = "";


function setShownForm(text) {
  _shown_form = text;
}

function setCurrentUser(user) {
  let cookie_meta = get_cookie_meta()
  $.cookie(CVar.current_user, JSON.stringify(user) || "", cookie_meta);
  $.cookie(CVar.user_logged_in, (userToken() ? true : false), cookie_meta);
}

function userToken(){
  return currentUser().api_key
}

let currentUser = () => {
  let current_user =  $.cookie(CVar.current_user) || {}
  return typeof current_user === 'object'
          ? current_user
          : JSON.parse(current_user)
}

function setErrorMessage(_error) {
  _error_msg = "Invalid details. Please cross-check";
}

function setUserLoginStatus(status){
  $.cookie(CVar.user_logged_in, status);
}

function update(id, updates) {
  _users[id] = assign({}, _users[id], updates);
}

function updateAll(updates) {
  for (var id in _users) {
    update(id, updates);
  }
}

function logoutUser() {
  $.removeCookie(CVar.current_user);
  $.removeCookie(CVar.user_logged_in);
}


function get_cookie_meta(){
  var currentDate = new Date();
  var expirationDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()+1,
    0, 0, 0);
  return {path: '/', expires: expirationDate}
}

var AuthStore = assign({}, EventEmitter.prototype, {

  getShownForm: function() {
    return _shown_form;
  },

  getCurrentUser: function() {
    return currentUser()
  },

  getCurrentUserToken: function() {
    return userToken();
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

    case ZhishiConstants.AUTH_LOG_IN_ERROR:
      setErrorMessage(action._error)
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
