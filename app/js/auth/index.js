import CVar from '../config/CookieVariables.js';
import assign from 'object-assign';

$.cookie.json = true;

class Auth {
  currentUser() {
    let currentUser = $.cookie(CVar.current_user) || {};
    return typeof currentUser === 'object' ?
      currentUser : this.parseUser(currentUser);
  }

  getCurrentUser() {
    return this.currentUser();
  }

  getCurrentUserToken() {
    return this.userToken();
  }

  userLoggedIn() {
    return $.cookie(CVar.user_logged_in);
  }

  userToken() {
    return this.currentUser().api_key;
  }

  setCurrentUser(state, user) {
    let cookieMeta = this.getCookieMeta();
    let updatedUser = this.stringify(assign({}, state, user));
    $.cookie(CVar.current_user, updatedUser, cookieMeta);
    $.cookie(CVar.user_logged_in, (this.userToken() !== undefined), cookieMeta);
    return this.currentUser();
  }

  stringify(obj) {
    return (typeof obj === 'object') ? JSON.stringify(obj) : obj;
  }

  setUserLoginStatus(status) {
    $.cookie(CVar.user_logged_in, status);
  }

  logoutUser() {
    $.removeCookie(CVar.current_user);
    $.removeCookie(CVar.user_logged_in);
  }

  updateAll(updates) {
    for (var id in this._users) {
      if ({}.hasOwnProperty.call(this._users, id)) {
        this.update(id, updates);
      }
    }
  }

  getFirstTimeMarker() {
    return $.cookie(CVar.first_time_marker);
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
}

export default new Auth();
