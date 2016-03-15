import AppDispatcher from '../dispatcher/AppDispatcher';
import ZhishiConstants from '../constants/ZhishiConstants';
import Common from '../utils/Common.js'

let SearchActions;

SearchActions = {
  receiveSearchResults: (data) => {
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.RECEIVE_SEARCH_RESULTS,
      data: data
    })
  }
}
export default SearchActions;
