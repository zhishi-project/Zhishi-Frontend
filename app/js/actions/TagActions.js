import AppDispatcher from '../dispatcher/AppDispatcher';
import ZhishiConstants from '../constants/ZhishiConstants';
import Common from '../utils/Common.js'

let TagActions;

TagActions = {
  receiveTags: (data) => {
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.TAG_INDEX,
      data: data
    })
  },

  selectTagForSubscription: (tag) => {
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.TAG_SELECT_FOR_SUBSCRIPTION,
      data: tag
    })
  }
}
export default TagActions;
