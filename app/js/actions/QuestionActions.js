import AppDispatcher from '../dispatcher/AppDispatcher';
import ZhishiConstants from '../constants/ZhishiConstants';
import Common from '../utils/Common.js';
import types from '../constants/questions/actionTypes';
import webAPI from './../utils/webAPI';
import mockQuestionApi from './../api/mockQuestionApi';

var QuestionActions;

/**
* @param {Object} data: key questions and value is an array of questions
* @return {Object} containing the action type and data
*/
export function loadQuestionsSuccess(data) {
  return {type: types.LOAD_QUESTIONS_SUCCESS, data};
}

/**
* @param {Object} question: an array of questions from backend db
* @return {Object} containing the action type and data
*/
export function loadQuestionSuccess(question) {
  return {type: types.LOAD_QUESTION_SUCCESS, question};
}

/**
* @param {Object} data: an array of top questions from backend db
* @return {Object} containing the action type and data
*/
export function loadTopQuestionsSuccess(data) {
  return {type: types.LOAD_TOP_QUESTIONS_SUCCESS, data};
}

/**
* @param {Object} data: info containing total votes and resource vote belongs
* @return {Object} containing the action type and data
*/
export function updateQuestionVoteSuccess(data) {
  return {type: types.UPDATE_QUESTION_VOTE_SUCCESS, data};
}

export function loadTopQuestions() {
  return dispatch => {
    return webAPI(`/top_questions`, 'GET', '')
    .then(data => {
      dispatch(loadTopQuestionsSuccess(data));
    });
  };
}

export function loadQuestion(questionId) {
  return dispatch => {
    return webAPI(`/questions/${questionId}`, 'GET', '')
    .then(data => {
      dispatch(loadQuestionSuccess(data));
    });
  };
}

export function updateQuestion({id, title, content}) {
  return dispatch => {
    return webAPI(`/questions/${id}`, 'PATCH', {title, content})
    .then(data => {
      dispatch(loadQuestionSuccess(data));
    });
  };
}

export function updateTestQuestion({id, title, content}) {
  return dispatch => {
    return mockQuestionApi.saveQuestion({title, content})
      .then(res => {
        let data = Object.assign({}, res, {id});
        dispatch(loadQuestionsSuccess(data));
      }).catch(err => console.log(err));
  };
}

export function loadAction(action, data) {
  return {
    type: action,
    data
  };
}

export function editQuestion(data) {
  return {
    type: types.EDIT_QUESTION,
    data
  };
}

QuestionActions = {
  createQuestion: question => {
    // QuestionActions.sendQuestionsToSlack(question)
    QuestionActions.receiveQuestion(question);
    window.location.href =
      `/questions/${Common.createPermalink(question.id, question.title)}`;
  },

  updateVote: (data) => {
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.QUESTION_UPDATE_VOTES,
      data: data
    });
  },
  filterQuestionWithTags: (data) => {
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.FILTER_QUESTIONS_WITH_TAGS,
      data: data
    });
  },

  sendQuestionsToSlack: (question) => {
    let prefix = ['Got a bit of time?', 'Hey, you down?', 'Hey, can you help?', 'SOS'];
    if (question) {
      let general = `${prefix[parseInt(Math.random() * 4)]}! ${question.user.name} just asked a question`;
      let personal = `${prefix[parseInt(Math.random() * 4)]}! ${question.user.name} just asked a question and mentioned you.`;
      Common.sendToSlack({id: question.id, title: question.title, content: question.content, intro: {general: general, personal: personal}});
    }
  }
};

export default QuestionActions;
