import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events'
import ZhishiConstants from '../constants/ZhishiConstants';
import assign from 'object-assign';
import CVar from "../config/CookieVariables.js"
import AuthStore from "./AuthStore.js"

let CHANGE_EVENT = 'change';

let _users = {}, _current_user = {};



function update(id, updates) {
  _users[id] = assign({}, _users[id], updates);
}

function updateCurrentUser(user){
  // user = (typeof user === 'object') ? JSON.stringify(user) : user
  // $.cookie(CVar.current_user, user || {});
  // update(user.id, user);
}


/**
 * Delete a User from the store
 */
function destroy(id) {
  delete _user[id];
}


var UserStore = assign({}, EventEmitter.prototype, {

  getAllUsers: function() {
    return _users;
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



    case ZhishiConstants.AUTH_LOG_OUT:
      if (AppDispatcher._isDispatching) { AppDispatcher.waitFor([AuthStore.dispatchToken]) };
      UserStore.emitChange();
      break;

    case ZhishiConstants.RECEIVE_USER:
      if (action.data)
      update(action.data.id, action.data)
      UserStore.emitChange();
      break;

    case ZhishiConstants.AUTH_LOG_OUT:
      clearUsers();
      UserStore.emitChange();
      break;

    default:
      // nothing for now
  }
});

export default UserStore;
