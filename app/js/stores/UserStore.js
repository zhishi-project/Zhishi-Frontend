import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events'
import ZhishiConstants from '../constants/ZhishiConstants';
import assign from 'object-assign';
import CVar from "../config/CookieVariables.js"
import AuthStore from "./AuthStore.js"

let CHANGE_EVENT = 'change';

let _users = {}, _followers = {}, _following = {}, _current_user = {};

function create_user(text) {
  // returns a newly created user. Necessary?
}

function loadUsers(data) {
  _following = (typeof data !== "undefined") ? data.following : {};
  _followers = (typeof data !== "undefined") ? data.followers : {};
  _users = assign({}, _users, data.followers)
  _users = assign({}, _users, data.following)
}

function clearUsers(data) {
  _users = {};
  _following = {};
  _followers = {};
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
    return _users[id];
  },
  getCurrentUser: function() {
    return AuthStore.getCurrentUser();
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

    // case ZhishiConstants.RECEIVE_DATA:
    //   loadUsers(action.data);
    //   UserStore.emitChange();
    //   break;

    case ZhishiConstants.AUTH_LOG_OUT:
      if (AppDispatcher._isDispatching) { AppDispatcher.waitFor([AuthStore.dispatchToken]) };
      UserStore.emitChange();
      break;

    case ZhishiConstants.RECEIVE_USER:
      if (action.data)
      update(action.data.id, action.data)
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
      clearUsers();
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

export default UserStore;
