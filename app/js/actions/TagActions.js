import types from '../constants/activities/actionTypes';
import webAPI from '../utils/webAPI.js';
import Auth from '../auth';
import AuthActions from './AuthActions';

/**
* @param {Object} activities to be loaded in store
* @return {Object} same as edit
*/
export function loadTagsSuccess(activities) {
  return ({type: types.LOAD_TAGS_SUCCESS, activities});
}

 /**
 * @param {Object} tags: id of the activity owner
 * @return {Func}  Success action to activity reducer
 */
export function subscribeToTag(tags) {
  return dispatch => {
    return webAPI('/tags/update_subscription', 'POST', {tags})
      .then(data => {
        if (data.tags) {
          let currentUser = Auth.getCurrentUser();
          data.tags.map(tag => tag.status = 'selected');
          currentUser.tags = data.tags;
          dispatch(AuthActions.loadCurrentUserSuccess(currentUser));
        }
      });
  };
}

/**
* @param {Object} tags: id of the activity owner
* @return {Func}  Success action to activity reducer
*/
export function loadTags() {
  return dispatch => {
    return webAPI('/tags/recent', 'GET')
    .then(tags => {
      dispatch(loadTagsSuccess(tags));
    });
  };
}

// let TagActions = {
//   receiveTags: (tags) => {
//     AppDispatcher.dispatch({
//       actionType: ZhishiConstants.TAG_INDEX,
//       data: tags
//     });
//   },
//
//   selectTagForSubscription: (tag) => {
//     AppDispatcher.dispatch({
//       actionType: ZhishiConstants.TAG_SELECT_FOR_SUBSCRIPTION,
//       data: tag
//     });
//   },
//
//   updateBatchTags: (tags) => {
//     AppDispatcher.dispatch({
//       actionType: ZhishiConstants.TAG_BATCH_UPDATE,
//       data: tags
//     });
//   }
// };
// export default TagActions;
