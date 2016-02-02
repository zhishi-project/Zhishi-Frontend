
var AppDispatcher = require('../dispatcher/AppDispatcher');
var ZhishiConstants = require('../constants/ZhishiConstants');

var QuestionActions = {

  // Receive inital product data
  receiveInitData: function(data) {
    if (AppDispatcher._isDispatching) { AppDispatcher.waitFor([UserStore.dispatchToken]) }
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.RECEIVE_INIT_DATA,
      data: data.data
    });
  }
};

module.exports = QuestionActions;
