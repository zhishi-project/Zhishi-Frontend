import * as enums from '../../utils/enumsHelpers.js';

/**
* @param {Object} users: all users in store
* @param {Object} id of the user to update
* @param {Object} updates for the user
* @return {object} updated object of users to be used as state
*/
export function updateUser(users, id, updates) {
  return enums.update(users, id, updates);
}
