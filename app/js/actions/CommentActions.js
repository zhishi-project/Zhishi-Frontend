var CommentActions;

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ZhishiConstants = require('../constants/ZhishiConstants');

CommentActions = {

  newComment: (data) => {
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.COMMENT_NEW,
      data: data
    });
  },

  receiveTopComments: (data) => {
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.RECEIVE_TOP_COMMENTS,
      data: data
    });
  },

  receiveComments: (data) => {
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.COMMENT_UPDATE,
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
  }
}

export default CommentActions;
