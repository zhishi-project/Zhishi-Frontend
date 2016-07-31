import types from '../constants/comments/actionTypes';
import webAPI from './../utils/webAPI.js';
// import mockQuestionApi from './../api/mockQuestionApi';

/**
* @param {Object} data: comment to be added to reducer state
* @return {Object} containing the action type and data
*/
function loadCommentSuccess(data) {
  return {type: types.LOAD_COMMENT_SUCCESS, data};
}

/**
* @param {Object} data: info containing total votes and resource vote belongs
* @return {Object} containing the action type and data
*/
export function updateCommentVoteSuccess(data) {
  return {type: types.UPDATE_COMMENT_VOTE_SUCCESS, data};
}

/**
* @param {Object} data: contains info about the comment resource and id
* @return {Object} containing the action type and data
*/
export function editComment(data) {
  return ({type: types.EDIT_COMMENT, data});
}

/**
* @param {Object} data: same as edit
* @return {Object} same as edit
*/
export function cancelComment(data) {
  return ({type: types.CANCEL_COMMENT_EDIT, data});
}

/**
* @param {Object} resourceId: id of the comment resource (question or answer)
* @param {Object} id: of the comment
* @return {Func}  Success action to Comment reducer
*/
export function updateComment({resourceId, id, data}) {
  return dispatch => {
    return webAPI(`/resources/${resourceId}/comments/${id}`, 'PATCH', data)
      .then(comment => {
        dispatch(loadCommentSuccess({comment}));
      });
  };
}

/**
* @param {Object} meta: contain resource type and id
* @param {Object} comment: comment with updates
* @param {Object} request: containing the path and http action of request
* @return {Func}  Success action to Comment reducer
*/
export function saveComment(meta, comment, request) {
  const {path, action} = request;
  return dispatch => {
    return webAPI(path, action, {content: comment.content})
    .then(comment => {
      dispatch(loadCommentSuccess({meta, comment}));
    });
  };
}

let CommentActions = {

  // updateVote: data => {
  //   AppDispatcher.dispatch({
  //     actionType: ZhishiConstants.COMMENT_UPDATE_VOTES,
  //     data: data
  //   });
  // },

  sendCommentsToSlack: () => {
    // let prefix = ['Hey, a comment', 'Hi, a new mention', 'Hey, an opinion', 'Hey, a remark', 'Hi, a footnote', 'Hello, a view', 'Hey hey, an exegesis'];
    // if (data && data.comment) {
    //   let meta = data.meta, comment = data.comment;
    //   let resource = meta.resource_name.substring(0, meta.resource_name.length - 1);
    //   let question = QuestionStore.getQuestion(meta.question_id) || {};
    //   let general = `${prefix[parseInt(Math.random() * 7)]} from ${comment.user.name} in response to ${question.user.name}'s ${resource}`;
    //   let personal = `Hey, ${comment.user.name} mentioned you in a comment on ${question.user.name}'s ${resource}`;
    //   Common.sendToSlack({id: question.id, title: question.title, content: comment.content, intro: {general: general, personal: personal}});
    // }
  }
};

export default CommentActions;
