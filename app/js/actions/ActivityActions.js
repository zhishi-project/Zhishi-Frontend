import types from '../constants/activities/actionTypes';
import webAPI from './../utils/webAPI.js';

/**
* @param {Object} activities to be loaded in store
* @return {Object} same as edit
*/
export function loadActivitySuccess(activities) {
  return ({type: types.LOAD_ACTIVITIES_SUCCESS, activities});
}

 /**
 * @param {Object} userId: id of the activity owner
 * @return {Func}  Success action to activity reducer
 */
export function loadActivities(userId) {
  return dispatch => {
    return webAPI(`/users/${userId}/activities`, 'GET')
     .then(data => {
       dispatch(loadActivitySuccess(data.activities));
     });
  };
}
