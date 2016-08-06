import * as enums from '../../utils/enumsHelpers.js';

/**
* @param {Object} state: current user
* @param {Object} user to be made current user
* @return {object} return user
*/
export function updateCurrentUser(state, user) {
  user = (typeof user === 'object') ? JSON.stringify(user) : user;
  $.cookie(CVar.this.currentUser, user || {});
  return user;
}
