
var AppDispatcher = require('../dispatcher/AppDispatcher');
var ZhishiConstants = require('../constants/ZhishiConstants');

var QuestionActions = {

  receiveQuestions: function(data) {
    if (AppDispatcher._isDispatching) { AppDispatcher.waitFor([QuestionStore.dispatchToken]) }
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.RECEIVE_QUESTIONS,
      data: data.data
    });
  },

  receiveTopQuestions: function(data) {
    if (AppDispatcher._isDispatching) { AppDispatcher.waitFor([QuestionStore.dispatchToken]) }
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.RECEIVE_TOP_QUESTIONS,
      data: data.data
    });
  }
};

module.exports = QuestionActions;
