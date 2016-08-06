import assign from 'object-assign';
import * as enums from '../../utils/enumsHelpers.js';

/* eslint-disable camelcase */

export function loadAnswer(questionId, answers) {
  let answersObj = {};
  answersObj[questionId] = enums.serializeByKey(answers);
  return answersObj;
}

export function loadAnswersFromQuestion(state, question) {
  return assign({}, state, loadAnswer(question.id, question.answers));
}

export function edit(answers, ansToEdit) {
  let {question_id, id} = ansToEdit;
  let answer = answers[question_id][id];
  return update(answers, answer, true);
}

export function update(answers, answer, editing) {
  const {question_id, id} = answer;
  return enums.update(answers, question_id,
              enums.update({}, id, answer, editing));
}

export function updateAnswer(answers, answer) {
  return update(answers, assign({}, answer, {editing: null}));
}

/**
* @param {Object} answers currently in state
* @param {Object} data with most recent votes
* @return {object} state with updates having any editing status removed
*/
export function updateVotesCount(answers, data) {
  let {meta, id, votesCount, value} = data;
  let answer = assign({}, answers[meta.questionId][id], {
    votes_count: votesCount.response,
    user_vote: value
  });
  let questionAnswers = enums.update(answers[meta.questionId], id, answer);
  return enums.update(answers, meta.questionId, questionAnswers);
}
