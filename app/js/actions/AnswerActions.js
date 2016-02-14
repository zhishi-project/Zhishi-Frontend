var AnswerActions;

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ZhishiConstants = require('../constants/ZhishiConstants');

AnswerActions = {

  receiveTopAnswers: (data) => {
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.RECEIVE_TOP_ANSWERS,
      data: data.data
    });
  },

  receiveAnswers: (data) => {
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.ANSWER_UPDATE,
      data: data.data
    });
  },

  receiveAnswer: (data) => {
    debugger;
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.ANSWER_UPDATE,
      data: data.data
    });
  },


  editAnswer: (data) => {
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.ANSWER_EDIT,
      data: data
    });
  }

}

export default AnswerActions;
