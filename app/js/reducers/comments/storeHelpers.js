import assign from 'object-assign';
import * as enums from '../../utils/enumsHelpers.js';

/**
This is a work in progress this needs major refactor
**/

/* eslint-disable camelcase */

export function loadAllComments(state, question) {
  const {id, answers, comments} = question;
  let newState = assign({}, state);
  newState.questions = loadComments(state.questions, id, comments);
  newState.answers = loadAnswersComments(state.answers, question.answers);
  return newState;
}

export function loadComments(resource, id, comments) {
  comments = enums.serializeByKey(comments);
  return enums.update(resource, id, comments);
}

export function loadAnswersComments(state, answers) {
  let newState = assign({}, state);
  answers.forEach(answer => {
    newState = assign(newState,
      loadComments(state, answer.id, answer.comments));
  });
  return newState;
}

function getMeta(resourceName, resourceId) {
  return {resourceName, resourceId};
}

export function create(resourceName, resourceId) {
  this._new_comments[resourceName] = resourceId;
}

export function edit(state, data) {
  const {meta, comment} = data;
  return update(state, {meta, comment}, true);
}

export function cancelEdit(state, data) {
  const {meta, comment} = data;
  let newComment = assign({}, comment, {editing: false});
  return update(state, {meta, newComment});
}

function update(state, data, editing) {
  const {resourceName, resourceId} = data.meta;
  let existingComments = state[resourceName][resourceId];
  let comment = assign({}, data.comment, {editing: editing});
  let comments = enums.update(existingComments, comment.id, comment);
  return enums.update(state, resourceName,
        enums.update(state[resourceName], resourceId, comments));
}

export function updateComment(state, data) {
  return update(state, data);
}

/**
* @param {Object} state currently in state
* @param {Object} data with most recent votes
* @return {object} state with updates having any editing status removed
*/
export function updateVotesCount(state, data) {
  const {meta, id, votesCount, value} = data;
  const {resourceName, resourceId} = data.meta;
  let comment = assign({}, state[resourceName][resourceId][id], {
    votes_count: votesCount.response,
    user_vote: value
  });
  const updates = {meta, comment};
  return update(state, updates);
}

// class CommentStore extends BaseStore {
//   constructor() {
//     super();
//     this.subscribe(() => this._registerActions.bind(this));
//     this._comments = {questions: {}, answers: {}};
//     this._new_comments = {questions: {}, answers: {}};
//
//   }
//   _new(resource_name, resource_id) {
//     this._new_comments[resource_name][resource_id] = {};
//     this._new_comments[resource_name][resource_id]['show_new_form'] = true;
//   }
//   create(resource_name, resource_id) {
//     this._new_comments[resource_name] = resource_id;
//   }
//   edit(meta, id) {
//     let status = this._comments[meta.resource_name][meta.resource_id][id]['status'];
//     status = status === 'editing' ? '' : 'editing';
//     this._comments[meta.resource_name][meta.resource_id][id]['status'] = status;
//   }
//   update(meta, comment) {
//     var existing_comment = this._comments[meta.resource_name][meta.resource_id];
//     Object.assign(this._comments[meta.resource_name], Common.update(existing_comment, comment.id, comment));
//     this._new_comments[meta.resource_name][meta.resource_id] = {};
//   }
//
//   update_votes_count({id, votes_count, meta, value}) {
//     this._comments[meta.resource_name][meta.resource_id][id]['votes_count'] = votes_count.response;
//     this._comments[meta.resource_name][meta.resource_id][id]['user_vote'] = value;
//   }
//   getComment(resource_id, id) {
//     return ( this._comments[resource_id] ? this._comments[resource_id][id] : {} );
//   }
//
//   getComments(resource_name, resource_id) {
//     return ( this._comments[resource_name] ? this._comments[resource_name][resource_id] : false );
//   }
//
//   getNewCommentFormStatus(resource_name, resource_id) {
//     return ( this._new_comments[resource_name] && this._new_comments[resource_name][resource_id] ? this._new_comments[resource_name][resource_id]['show_new_form'] : false );
//   }
//
//
// }
// export default new CommentStore();
