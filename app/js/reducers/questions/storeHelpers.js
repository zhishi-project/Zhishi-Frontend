import * as enums from '../../utils/enumsHelpers.js';
import assign from 'object-assign';

/* eslint-disable camelcase */

/**
* @param {Object} state: current application state. Most likely empty though
* @param {Object} questions object of questions (unserialized)
* @return {object} new serialized question object
*/
export function loadQuestions(state, questions) {
  return assign({}, state, enums.serializeByKey(questions));
}

/**
* @param {Object} questions object of questions currently in state
* @param {Object} id of question to edit
* @return {object} questions state with the specific question set to editing
*/
export function edit(questions, id) {
  return update(questions, questions[id], true);
}

/**
* @param {Object} questions object of questions currently in state
* @param {Object} updatedQuestion of question to edit
* @param {Object} editing: Boolean to show if edit status is to be set to editing
* @return {object} new serialized question object
*/
function update(questions, updatedQuestion, editing) {
  return enums.update(questions, updatedQuestion.id, updatedQuestion, editing);
}

/**
* @param {Object} questions object of questions currently in state
* @param {Object} question object with most recent updates
* @return {object} state with updates having any editing status removed
*/
export function updateQuestion(questions, question) {
  return update(questions, assign({}, question, {editing: null}));
}

/**
* @param {Object} questions object of questions currently in state
* @param {Object} data object with most recent updates
* @return {object} state with updates having any editing status removed
*/
export function updateVotesCount(questions, data) {
  let question = assign({}, questions[data.id], {
    votes_count: data.votesCount.response,
    user_vote: data.value
  });
  return update(questions, question);
}

/**
* @param {Array} ids object of questions currently in state
* @return {object} questions of the ids
*/
export function retrieveQuestions(ids) {
  let questions = {};
  ids.forEach(id => questions[id] = this.questions[id]);
  return questions;
}
