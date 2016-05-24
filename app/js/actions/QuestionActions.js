import AppDispatcher from '../dispatcher/AppDispatcher';
import ZhishiConstants from '../constants/ZhishiConstants';
import Common from '../utils/Common.js';
import QuestionStore from '../stores/QuestionStore';

var QuestionActions;

var waitForQuestionStore =  function() {
  if (AppDispatcher._isDispatching) { AppDispatcher.waitFor([QuestionStore.dispatchToken]) }
}

QuestionActions = {
  createQuestion: (question) => {
    QuestionActions.sendQuestionsToSlack(question)
    QuestionActions.receiveQuestion(question)
    window.location.href = `/questions/${Common.createPermalink(question.id, question.title)}`
  },

  receiveQuestions: (data) => {
    waitForQuestionStore();
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.RECEIVE_QUESTIONS,
      data: data
    });
  },
  recieveUserQuestions: data => {
    waitForQuestionStore();
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.RECEIVE_USER_QUESTIONS,
      data: data
    });
  },

  receiveQuestion: (question, new_question) => {
    waitForQuestionStore();
    if (question && question.id) {
      AppDispatcher.dispatch({
        actionType: ZhishiConstants.QUESTION_UPDATE,
        data: question
      });
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
  },

  sendQuestionsToSlack: (question) => {
    let prefix = ["Got a bit of time?", 'Hey, you down?', 'Hey, can you help?', 'SOS']
    if (question) {
      let general = `${prefix[parseInt(Math.random() * 4)]}! ${question.user.name} just asked a question`
      let personal = `${prefix[parseInt(Math.random() * 4)]}! ${question.user.name} just asked a question and mentioned you.`
      Common.sendToSlack({id: question.id, title: question.title, content: question.content, intro: {general: general, personal: personal}})
    }
  }
}

export default QuestionActions;
