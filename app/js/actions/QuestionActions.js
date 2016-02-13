
var AppDispatcher = require('../dispatcher/AppDispatcher');
var ZhishiConstants = require('../constants/ZhishiConstants');
var QuestionActions;

var waitForQuestionStore =  function(){
  if (AppDispatcher._isDispatching) { AppDispatcher.waitFor([QuestionStore.dispatchToken]) }
}

QuestionActions = {
  createQuestion: function(data){
    QuestionActions.receiveQuestion(data, true)
  },

  receiveQuestions: function(data) {
    waitForQuestionStore();
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.RECEIVE_QUESTIONS,
      data: data.data
    });
  },

  receiveQuestion: function(data, new_question) {
    waitForQuestionStore();
    if (data.data && data.data.id) {
      AppDispatcher.dispatch({
        actionType: ZhishiConstants.QUESTION_UPDATE,
        data: data.data
      });
      if (new_question) { window.location.href = `/questions/${data.data.id}`}
    }
  },

  receiveTopQuestions: function(data) {
    waitForQuestionStore();
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.RECEIVE_TOP_QUESTIONS,
      data: data.data
    });
  },

  receiveQuestionAnswer: function(data) {
    waitForQuestionStore();
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.RECEIVE_ANSWER,
      data: data.data
    });
  }
}

export default QuestionActions;
