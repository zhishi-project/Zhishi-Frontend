import webAPI from './../utils/webAPI.js';
import types from '../constants/answers/actionTypes';
// import mockQuestionApi from './../api/mockQuestionApi';

var AnswerActions;

/* eslint-disable camelcase */

export function loadAnswersSuccess(data) {
  return {type: types.LOAD_ANSWERS_SUCCESS, data};
}

export function loadAnswerSuccess(data) {
  return {type: types.LOAD_ANSWER_SUCCESS, data};
}

/**
* @param {Object} data: info containing total votes and resource vote belongs
* @return {Object} containing the action type and data
*/
export function loadAnswerVoteSuccess(data) {
  return {type: types.UPDATE_ANSWER_VOTE_SUCCESS, data};
}

function action(type, data) {
  return {type, data};
}

export function loadAnswers(questionId) {
  return dispatch => {
    return webAPI(`/questions/${questionId}/answers`, 'GET', '')
    .then(answers => {
      dispatch(loadAnswersSuccess({questionId, answers}));
    });
  };
}

export function editAnswer(answer) {
  return action(types.EDIT_ANSWER, answer);
}

export function updateAnswer({question_id, id, content}) {
  return dispatch => {
    return webAPI(`/questions/${question_id}/answers/${id}`, 'PATCH', {content})
      .then(response => {
        dispatch(loadAnswerSuccess(response));
      });
  };
}

export function acceptAnswer({question_id, id}) {
  return dispatch => {
    return webAPI(`/questions/${question_id}/answers/${id}/accept`, 'POST', {})
      .then(response => {
        dispatch(loadAnswerSuccess(response));
      });
  };
}

export function createAnswer({questionId, content}) {
  return dispatch => {
    return webAPI(`/questions/${questionId}/answers`, 'POST', {content})
      .then(response => {
        dispatch(loadAnswerSuccess({questionId, response}));
      });
  };
}

AnswerActions = {

  // sendAnswersToSlack: (answer) => {
  //   let compliments = ['Nice', 'Bravo', 'Helpful indeed', 'Oshey'];
  //   let question = getQuestion(answer.question_id);
  //   if (question) {
  //     let general = `${compliments[parseInt(Math.random() * 4)]}! ${answer.user.name} answered ${question.user.name}'s question`;
  //     let personal = `${compliments[parseInt(Math.random() * 4)]}! ${answer.user.name} mentioned you in an answer to ${question.user.name}'s question`;
  //     Common.sendToSlack({id: answer.question_id, title: question.title, content: answer.content, intro: {general: general, personal: personal}});
  //   }
  // }
};

export default AnswerActions;
