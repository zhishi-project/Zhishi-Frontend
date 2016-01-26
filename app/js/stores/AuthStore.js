import CVar from "../components/auth/CookieVariables.js"
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ZhishiConstants = require('../constants/ZhishiConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _shown_form = "login", _error_msg = "";


function setShownForm(text) {
  _shown_form = text;
}

function setUserToken(user) {
  debugger
  $.cookie(CVar.current_user, JSON.stringify(user) || "");
  $.cookie(CVar.user_logged_in, userToken() ? true : false);
  debugger;
}

function userToken(){
  return JSON.parse($.cookie(CVar.current_user) || "{}").token;
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


var AuthStore = assign({}, EventEmitter.prototype, {

  getShownForm: function() {
    return _shown_form;
  },
  getCurrentUser: function() {
    return JSON.parse($.cookie(CVar.current_user) || "{}");
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
  var text;
  switch(action.actionType) {

    case ZhishiConstants.AUTH_FORM_SELECTED:
      setShownForm(action.data);
      AuthStore.emitChange();
      break;

    case ZhishiConstants.RECEIVE_INIT_DATA:
      if (!AuthStore.userLoggedIn()) {
        setUserToken(action.data.current_user || {});
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
