import BaseStore from './BaseStore';
import ZhishiConstants from '../constants/ZhishiConstants';
import CVar from '../config/CookieVariables.js';

class AuthStore extends BaseStore {
  constructor() {
    super();
    this.subscribe(() => this._registerActions.bind(this));
    this._shown_form = 'login';
    this._error_msg = '';
    this.user = null;
  }
  setShownForm(text) {
    this._shown_form = text;
  }
  currentUser() {
    let currentUser =  $.cookie(CVar.current_user) || {};
    return typeof currentUser === 'object' ? currentUser : this.parseUser(currentUser);
  }
  getCurrentUser() {
    return this.currentUser();
  }

  getCurrentUserToken() {
    return this.userToken();
  }

  getErrorMessage(){
    var _msg = _error_msg;
    _error_msg = "";
    return _msg;
  }

  userLoggedIn() {
    return $.cookie(CVar.user_logged_in);
  }
  userToken() {
    return this.currentUser().api_key;
  }
  setCurrentUser(user) {
    let cookieMeta = this.getCookieMeta();
    this.user = (typeof user === 'object') ? JSON.stringify(user) : user;
    $.cookie(CVar.current_user, user, cookieMeta);
    $.cookie(CVar.user_logged_in, (this.userToken() !== undefined), cookieMeta);
  }
  setErrorMessage() {
    this._error_msg = 'Invalid details. Please cross-check';
  }
  setUserLoginStatus(status) {
    $.cookie(CVar.user_logged_in, status);
  }

  logoutUser() {
    $.removeCookie(CVar.current_user);
    $.removeCookie(CVar.user_logged_in);
  }
  update(id, updates) {
    this._users[id] = Object.assign({}, this._users[id], updates);
  }
  updateAll(updates) {
    for (var id in this._users) {
      if ({}.hasOwnProperty.call(this._users, id)) {
        this.update(id, updates);
      }
    }
  }
  getFirstTimeMarker() {
    return $.cookie(CVar.first_time_marker)
  }
  setFirstTimeMarker(bool) {
    $.cookie(CVar.first_time_marker, bool, this.getCookieMeta());
  }

  parseUser(user) {
    return typeof user === 'object' ? user : this.parseUser(JSON.parse(user));
  }
  getCookieMeta() {
    var currentDate = new Date();
    var expirationDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1,
      0, 0, 0);
    return {path: '/', expires: expirationDate};
  }
  _registerActions(action) {
    switch (action.actionType) {

      case ZhishiConstants.AUTH_FORM_SELECTED:
        this.setShownForm(action.data);
        this.emitChange();
        break;

      case ZhishiConstants.AUTH_LOG_IN:
        if (!this.userLoggedIn() && action.data) {
          this.setCurrentUser(action.data);
          this.emitChange();
        }
        break;

      case ZhishiConstants.CURRENT_USER_UPDATE:
        this.setCurrentUser(action.data);
        this.emitChange();
        break;

      case ZhishiConstants.AUTH_LOG_IN_ERROR:
        this.setErrorMessage(action._error);
        this.emitChange();
        break;

      case ZhishiConstants.FIRST_TIME_LOGIN_TODAY:
        this.setFirstTimeMarker(action.data);
        this.emitChange();
        break;

      case ZhishiConstants.AUTH_LOG_OUT:
        this.logoutUser();
        this.emitChange();
        break;
      default:
    }
  }
}

export default new AuthStore();
