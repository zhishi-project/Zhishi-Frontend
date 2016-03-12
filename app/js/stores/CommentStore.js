var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ZhishiConstants = require('../constants/ZhishiConstants');
var assign = require('object-assign');
import QuestionStore from './QuestionStore.js'
import Common from '../utils/Common.js'


var CHANGE_EVENT = 'change';

var _comments = { questions: {}, answers: {} }, _new_comments = { questions: {}, answers: {} };

let loadComments = (meta, comments) => {
  comments = Common.serializeByKey(comments);
  Common.update(_comments[meta.resource_name], meta.resource_id, comments, true)
}

let loadAnswersComments = (answers) => {
  answers.forEach(answer => loadComments(get_meta('answers', answer.id), answer.comments))
}

let _new = (resource_name, resource_id) => {
  _new_comments[resource_name][resource_id] = {}
  _new_comments[resource_name][resource_id]['show_new_form'] = true
}

let create = (resource_name, resource_id) => {
  _new_comments[resource_name] = resource_id
}

let edit = (meta, id) => {
  _comments[meta.resource_name][meta.resource_id][id]['status'] = 'editing'
}

let update = (meta, comment) => {
  var existing_comment = _comments[meta.resource_name][meta.resource_id]
  $.extend(_comments[meta.resource_name], Common.update(existing_comment, comment.id, comment))
  _new_comments[meta.resource_name][meta.resource_id] = {}
}

let update_votes_count = (id, votes_count, meta) => {
  _comments[meta.resource_name][meta.resource_id][id]['votes_count'] = votes_count
}

let destroy = (id) => {
  delete _user[id];
}

let get_meta = (resource_name, resource_id) => {
  return {resource_name: resource_name, resource_id: resource_id}
}


let CommentStore = assign({}, EventEmitter.prototype, {

  getComment: (resource_id, id) => {
    return ( _comments[resource_id] ? _comments[resource_id][id] : {} );
  },

  getComments: (resource_name, resource_id) => {
    return ( _comments[resource_name] ? _comments[resource_name][resource_id] : false );
  },

  getNewCommentFormStatus: (resource_name, resource_id) => {
    return ( _new_comments[resource_name] && _new_comments[resource_name][resource_id] ? _new_comments[resource_name][resource_id]['show_new_form'] : false );
  },

  getTopComments: () => {
    return _top_comments
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
CommentStore.dispatchToken = AppDispatcher.register((action) => {
  var text;

  switch(action.actionType) {

    case ZhishiConstants.QUESTION_UPDATE:
      if (action.data && action.data.comments) {
        loadComments(get_meta('questions', action.data.id), action.data.comments)
        loadAnswersComments(action.data.answers);
        CommentStore.emitChange();
      }
      break;

    case ZhishiConstants.COMMENT_INDEX:
      if (action.data && action.data.comments) {
        loadComments(action.data.meta, action.data.comments)
        CommentStore.emitChange();
      }
      break;

    // case ZhishiConstants.ANSWER_UPDATE:
    //   if (action.data && action.data.comments) {
    //     loadComments("answers", action.data.id, action.data.comments)
    //     CommentStore.emitChange();
    //   }
    //   break;

    case ZhishiConstants.COMMENT_NEW:
      if (action.data) {
        _new(action.data.resource_name, action.data.resource_id)
        CommentStore.emitChange();
      }
      break;

    case ZhishiConstants.COMMENT_EDIT:
      if (action.data) {
        edit(action.data.meta, action.data.id)
        CommentStore.emitChange();
      }
      break;


    case ZhishiConstants.COMMENT_CREATE:
      if (action.data && action.data.comment) {
        update(action.data.meta, action.data.comment);
      }
      CommentStore.emitChange();
      break;

    case ZhishiConstants.COMMENT_UPDATE:
      if (action.data && action.data.comment) {
        update(action.data.meta, action.data.comment);
      }
      CommentStore.emitChange();
      break;

    case ZhishiConstants.COMMENT_UPDATE_VOTES:
      if (action.data) {
        update_votes_count(action.data.id, action.data.votes_count.response, action.data.meta)
        CommentStore.emitChange();
      }
      break;

    default:
      // nothing for now
  }
});

export default CommentStore;
