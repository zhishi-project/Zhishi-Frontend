var AnswerActions;

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ZhishiConstants = require('../constants/ZhishiConstants');
import Common from '../utils/Common.js'
import QuestionStore from "../stores/QuestionStore.js"

AnswerActions = {
  createAnswer: (answer) => {
    AnswerActions.receiveAnswer(answer)
    AnswerActions.sendAnswersToSlack(answer)
  },

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

  receiveAnswer: (answer) => {
    if (answer) {
      AppDispatcher.dispatch({
        actionType: ZhishiConstants.ANSWER_UPDATE,
        data: answer
      });
    }
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
  },

  sendAnswersToSlack: (answer) => {
    let compliments = ['Nice', 'Bravo', 'Helpful indeed', 'Oshey']
    let question = QuestionStore.getQuestion(answer.question_id)
    if (question) {
      let general = `${compliments[parseInt(Math.random() * 4)]}! ${answer.user.name} answered ${question.user.name}'s question`
      let personal = `${compliments[parseInt(Math.random() * 4)]}! ${answer.user.name} mentioned you in an answer to ${question.user.name}'s question`
      Common.sendToSlack({id: answer.question_id, title: question.title, content: answer.content,  intro: {general: general, personal: personal}})
    }
  }
}

export default AnswerActions;
