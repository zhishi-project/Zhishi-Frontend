var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ZhishiConstants = require('../constants/ZhishiConstants');
var assign = require('object-assign');
import CVar from "../components/auth/CookieVariables.js"
import AuthStore from "./AuthStore.js"

var CHANGE_EVENT = 'change';

var _users = {}, _followers = {}, _following = {}, _current_user = {};
// $.cookie("_users", {});

function create_user(text) {
  // returns a newly created user. Necessary?
}

function loadUsers(data) {
  _following = (typeof data !== "undefined") ? data.following : {};
  _followers = (typeof data !== "undefined") ? data.followers : {};
  _users = assign({}, _users, data.followers)
  _users = assign({}, _users, data.following)
}

function logoutUser(data) {
  _users = {};
  _following = {}
  _followers = {}
}

function currentUser(){
  return JSON.parse($.cookie(CVar.current_user) || "{}");
}
/**
 * Update a single User
 */
function update(id, updates) {
  _users[id] = assign({}, _users[id], updates);
}

function updateCurrentUser(user){
  $.cookie(CVar.current_user, JSON.stringify(user) || {});
  update(user.id, user);
}

/**
 * Update all users within the same object.
 * Necessary for group delete or something like that.
 */
function updateAll(updates) {
  for (var id in _users) {
    update(id, updates);
  }
}

/**
 * Delete a User from the store
 */
function destroy(id) {
  delete _user[id];
}

function removeCurrentUser() {
}

var UserStore = assign({}, EventEmitter.prototype, {

  getAllUsers: function() {
    return _users;
  },
  getAllFollowers: function() {
    return _followers;
  },
  getAllFollowing: function() {
    return _following;
  },
  getUser: function(id) {
    return _users[id] || {}
  },
  getCurrentUser: function() {
    return currentUser();
  },

  getFullName: function(user) {
    return (user.first_name || "") + " " + (user.last_name || "");
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

// Register callback to handle all updates
UserStore.dispatchToken = AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {

    case ZhishiConstants.RECEIVE_DATA:
      loadUsers(action.data);
      UserStore.emitChange();
      break;

    case ZhishiConstants.AUTH_LOG_OUT:
      if (AppDispatcher._isDispatching) { AppDispatcher.waitFor([AuthStore.dispatchToken]) };
      UserStore.emitChange();
      break;

    case ZhishiConstants.USER_COMPLETE:
      update(action.id, {complete: true});
      UserStore.emitChange();
      break;


    case ZhishiConstants.CURRENT_USER_UPDATE:
      updateCurrentUser(action.data)
      UserStore.emitChange();
      break;

    case ZhishiConstants.USER_DESTROY:
      destroy(action.id);
      UserStore.emitChange();
      break;

    case ZhishiConstants.AUTH_LOG_OUT:
      logoutUser();
      UserStore.emitChange();
      break;
      
    case ZhishiConstants.USER_DESTROY_COMPLETED:
      destroyCompleted();
      UserStore.emitChange();
      break;

    default:
      // nothing for now
  }
});

module.exports = UserStore;
