import assign from 'object-assign';

/**
* @param {Object} state existing activities in store
* @param {Object} activities to add to store
* @return {object} state with updates
*/
export function loadActivities(state, activities) {
  return assign([], state, activities);
}
