import AppDispatcher from '../dispatcher/AppDispatcher';
import ZhishiConstants from '../constants/ZhishiConstants';
import Common from '../utils/Common.js'

var QuestionActions;

var waitForQuestionStore =  function(){
  if (AppDispatcher._isDispatching) { AppDispatcher.waitFor([QuestionStore.dispatchToken]) }
}

QuestionActions = {
  createQuestion: (data) => {
    Common.sendToSlack(data)
    QuestionActions.receiveQuestion(data, true)
  },

  receiveQuestions: (data) => {
    waitForQuestionStore();
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.RECEIVE_QUESTIONS,
      data: data
    });
  },

  receiveQuestion: (data, new_question) => {
    waitForQuestionStore();
    if (data && data.id) {
      AppDispatcher.dispatch({
        actionType: ZhishiConstants.QUESTION_UPDATE,
        data: data
      });
      if (new_question) { window.location.href = `/questions/${data.id}`}
    }
  },

  receiveTopQuestions: (data) => {
    waitForQuestionStore();
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.RECEIVE_TOP_QUESTIONS,
      data: data
    });
  },

  editQuestion: (data) => {
    waitForQuestionStore();
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.QUESTION_EDIT,
      data: data
    });
  },


  updateVote: (data) => {
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.QUESTION_UPDATE_VOTES,
      data: data
    });
  }
}

export default QuestionActions;
