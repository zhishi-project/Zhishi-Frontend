var CommentActions;

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ZhishiConstants = require('../constants/ZhishiConstants');
import Common from '../utils/Common.js'
import QuestionStore from "../stores/QuestionStore.js"
import AnswerStore from "../stores/AnswerStore.js"

CommentActions = {

  newComment: (data) => {
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.COMMENT_NEW,
      data: data
    });
  },

  createComment: (data) => {
    CommentActions.receiveComment(data);
    CommentActions.sendCommentsToSlack(data)
  },

  receiveTopComments: (data) => {
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.RECEIVE_TOP_COMMENTS,
      data: data
    });
  },

  receiveComments: (data) => {
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.COMMENT_INDEX,
      data: data
    });
  },

  receiveComment: (data) => {
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.COMMENT_UPDATE,
      data: data
    });
  },

  editComment: (data) => {
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.COMMENT_EDIT,
      data: data
    });
  },

  updateVote: (data) => {
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.COMMENT_UPDATE_VOTES,
      data: data
    });
  },


  sendCommentsToSlack: (data) => {
    let prefix = ['Hey, a comment', 'Hi, a new mention', 'Hey, an opinion', 'Hey, a remark', 'Hi, a footnote', 'Hello, a view', 'Hey hey, an exegesis']
    if (data && data.comment) {
      let meta = data.meta, comment = data.comment;
      let question = QuestionStore.getQuestion(meta.question_id) || {}
      let intro = `${prefix[parseInt(Math.random() * 7)]} from ${comment.user.name} in response to ${question.user.name}'s ${meta.resource_name}'s`
      Common.sendToSlack({id: question.id, title: question.title, content: comment.content, intro: intro})
    }
  }
}

export default CommentActions;