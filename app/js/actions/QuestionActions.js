
var AppDispatcher = require('../dispatcher/AppDispatcher');
var ZhishiConstants = require('../constants/ZhishiConstants');

var QuestionActions = {

  createQuestion: function(data) {
    receiveQuestions(data);

  },

  receiveQuestions: function(data) {
    if (AppDispatcher._isDispatching) { AppDispatcher.waitFor([QuestionStore.dispatchToken]) }
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.RECEIVE_QUESTIONS,
      data: data.data
    });
  },

  receiveQuestion: function(data) {
    if (AppDispatcher._isDispatching) { AppDispatcher.waitFor([QuestionStore.dispatchToken]) }
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.QUESTION_UPDATE,
      data: data.data
    });
  },

  receiveTopQuestions: function(data) {
    if (AppDispatcher._isDispatching) { AppDispatcher.waitFor([QuestionStore.dispatchToken]) }
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.RECEIVE_TOP_QUESTIONS,
      data: data.data
    });
  },

  receiveQuestionAnswer: function(data) {
    if (AppDispatcher._isDispatching) { AppDispatcher.waitFor([QuestionStore.dispatchToken]) }
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.RECEIVE_ANSWER,
      data: data.data
    });
  }
};

module.exports = QuestionActions;
