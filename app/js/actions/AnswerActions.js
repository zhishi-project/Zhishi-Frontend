var AnswerActions;

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ZhishiConstants = require('../constants/ZhishiConstants');

AnswerActions = {

  receiveTopAnswers: (data) => {
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.RECEIVE_TOP_ANSWERS,
      data: data
    });
  },

  receiveAnswers: (data) => {
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.ANSWER_INDEX,
      data: data
    });
  },

  receiveAnswer: (data) => {
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.ANSWER_UPDATE,
      data: data
    });
  },


  editAnswer: (data) => {
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.ANSWER_EDIT,
      data: data
    });
  },


  updateVote: (data) => {
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.ANSWER_UPDATE_VOTES,
      data: data
    });
  }
}

export default AnswerActions;
