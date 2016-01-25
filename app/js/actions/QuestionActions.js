
var AppDispatcher = require('../dispatcher/AppDispatcher');
var ZhishiConstants = require('../constants/ZhishiConstants');
import UserStore from "../stores/UserStore.js"

var DisplayActions = {

  // Receive inital product data
  attachModalToPage: function(modal_data) {
    if (AppDispatcher._isDispatching) { AppDispatcher.waitFor([UserStore.dispatchToken]) }
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.RECEIVE_MODAL,
      data: modal_data
    });
  }
};

module.exports = DisplayActions;
