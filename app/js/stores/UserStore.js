import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import ZhishiConstants from '../constants/ZhishiConstants';
import assign from 'object-assign';
import CVar from '../config/CookieVariables.js';
import BaseStore from './BaseStore';
import AuthStore from './AuthStore';

class UserStore extends BaseStore {
  constructor() {
    super();
    this._users = {};
    this.subscribe(() => this._registerActions.bind(this));
    this._currentUser = {};
  }

  update(id, updates) {
    this._users[id] = assign({}, this._users[id], updates);
  }

  updateCurrentUser(user) {
    user = (typeof user === 'object') ? JSON.stringify(user) : user;
    $.cookie(CVar.this.currentUser, user || {});
    this.update(user.id, user);
  }

  getAllUsers() {
    return this._users;
  }

  getUser(id) {
    return this._users[id];
  }

  getCurrentUser() {
    return AuthStore.getCurrentUser();
  }

  getFullName(user) {
    return (user.first_name || '') + (user.last_name || '');
  }

  _registerActions(action) {
    switch (action.actionType) {
      case ZhishiConstants.RECEIVE_USER:
      if (AppDispatcher.isDispatching()) { AppDispatcher.waitFor([AuthStore.dispatchToken]) };
        if (action.data) {
          this.update(action.data.id, action.data)
          this.emitChange();
        }
        break;
      default:
          // Nothing for now
      }
    }
  }
export default new UserStore();
