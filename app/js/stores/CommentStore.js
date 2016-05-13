import BaseStore from './BaseStore';
import ZhishiConstants from '../constants/ZhishiConstants';
import Common from '../utils/Common.js';
/**
This is a work in progress this needs major refactor
**/
class CommentStore extends BaseStore {
  constructor() {
    super();
    this.subscribe(() => this._registerActions.bind(this));
    this._comments = {questions: {}, answers: {}};
    this._new_comments = {questions: {}, answers: {}};

  }
  loadComments(meta, comments){
    comments = Common.serializeByKey(comments);
    Common.update(this._comments[meta.resource_name], meta.resource_id, comments, true)
  }
  loadAnswersComments(answers){
    answers.forEach(answer => this.loadComments(
      this.get_meta('answers', answer.id), answer.comments));
  }
  _new(resource_name, resource_id){
    this._new_comments[resource_name][resource_id] = {}
    this._new_comments[resource_name][resource_id]['show_new_form'] = true;
  }
  create (resource_name, resource_id){
    this._new_comments[resource_name] = resource_id;
 }
  edit(meta, id){
   this._comments[meta.resource_name][meta.resource_id][id]['status'] = 'editing';
}
  update(meta, comment){
    var existing_comment = this._comments[meta.resource_name][meta.resource_id];
    Object.assign(this._comments[meta.resource_name], Common.update(existing_comment, comment.id, comment));
    this._new_comments[meta.resource_name][meta.resource_id] = {}
  }

  update_votes_count({id, votes_count, meta, value}){
    this._comments[meta.resource_name][meta.resource_id][id]['votes_count'] = votes_count.response;
    this._comments[meta.resource_name][meta.resource_id][id]['user_vote'] = value
  }
  get_meta(resource_name, resource_id){
    return {resource_name: resource_name, resource_id: resource_id}
  }
  getComment(resource_id, id){
    return ( this._comments[resource_id] ? this._comments[resource_id][id] : {} );
  }

  getComments(resource_name, resource_id){
    return ( this._comments[resource_name] ? this._comments[resource_name][resource_id] : false );
  }
  getNewCommentFormStatus (resource_name, resource_id){
    return ( this._new_comments[resource_name] && this._new_comments[resource_name][resource_id] ? this._new_comments[resource_name][resource_id]['show_new_form'] : false );
  }
  _registerActions(action) {
    switch(action.actionType) {

      case ZhishiConstants.QUESTION_UPDATE:
        if (action.data && action.data.comments) {
          this.loadComments(this.get_meta('questions', action.data.id), action.data.comments)
          this.loadAnswersComments(action.data.answers);
          this.emitChange();
        }
        break;

      case ZhishiConstants.COMMENT_INDEX:
        if (action.data && action.data.comments) {
          this.loadComments(action.data.meta, action.data.comments)
          this.emitChange();
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
          this._new(action.data.resource_name, action.data.resource_id);
          this.emitChange();
        }
        break;

      case ZhishiConstants.COMMENT_EDIT:
        if (action.data) {
          this.edit(action.data.meta, action.data.id);
          this.emitChange();
        }
        break;
      case ZhishiConstants.COMMENT_CREATE:
        if (action.data && action.data.comment) {
          this.update(action.data.meta, action.data.comment);
        }
        CommentStore.emitChange();
        break;

      case ZhishiConstants.COMMENT_UPDATE:
        if (action.data && action.data.comment) {
          this.update(action.data.meta, action.data.comment);
        }
        this.emitChange();
        break;

      case ZhishiConstants.COMMENT_UPDATE_VOTES:
        if (action.data) {
          this.update_votes_count({...action.data});
          this.emitChange();
        }
        break;

      default:
        // nothing for now
    }
  }

}
export default new CommentStore();

// var AppDispatcher = require('../dispatcher/AppDispatcher');
// var EventEmitter = require('events').EventEmitter;
// var ZhishiConstants = require('../constants/ZhishiConstants');
// var assign = require('object-assign');
// import QuestionStore from './QuestionStore.js'
// import Common from '../utils/Common.js'


// var CHANGE_EVENT = 'change';

// var _comments = { questions: {}, answers: {} }, _new_comments = { questions: {}, answers: {} };

// let loadComments = (meta, comments) => {
//   comments = Common.serializeByKey(comments);
//   Common.update(_comments[meta.resource_name], meta.resource_id, comments, true)
// }

// let loadAnswersComments = (answers) => {
//   answers.forEach(answer => loadComments(get_meta('answers', answer.id), answer.comments))
// }

// let _new = (resource_name, resource_id) => {
//   _new_comments[resource_name][resource_id] = {}
//   _new_comments[resource_name][resource_id]['show_new_form'] = true
// }

// let create = (resource_name, resource_id) => {
//   _new_comments[resource_name] = resource_id
// }

// let edit = (meta, id) => {
//   _comments[meta.resource_name][meta.resource_id][id]['status'] = 'editing'
// }

// let update = (meta, comment) => {
//   var existing_comment = _comments[meta.resource_name][meta.resource_id]
//   $.extend(_comments[meta.resource_name], Common.update(existing_comment, comment.id, comment))
//   _new_comments[meta.resource_name][meta.resource_id] = {}
// }

// let update_votes_count = ({id, votes_count, meta, value}) => {
//   _comments[meta.resource_name][meta.resource_id][id]['votes_count'] = votes_count.response
//   _comments[meta.resource_name][meta.resource_id][id]['user_vote'] = value
// }

// let destroy = (id) => {
//   delete _user[id];
// }

// let get_meta = (resource_name, resource_id) => {
//   return {resource_name: resource_name, resource_id: resource_id}
// }


// let CommentStore = assign({}, EventEmitter.prototype, {

//   getComment: (resource_id, id) => {
//     return ( _comments[resource_id] ? _comments[resource_id][id] : {} );
//   },

//   getComments: (resource_name, resource_id) => {
//     return ( _comments[resource_name] ? _comments[resource_name][resource_id] : false );
//   },

//   getNewCommentFormStatus: (resource_name, resource_id) => {
//     return ( _new_comments[resource_name] && _new_comments[resource_name][resource_id] ? _new_comments[resource_name][resource_id]['show_new_form'] : false );
//   },

//   getTopComments: () => {
//     return _top_comments
//   },

//   emitChange: function() {
//     this.emit(CHANGE_EVENT);
//   },

//   addChangeListener: function(callback) {
//     this.on(CHANGE_EVENT, callback);
//   },

//   removeChangeListener: function(callback) {
//     this.removeListener(CHANGE_EVENT, callback);
//   }
// });

// // Register callback to handle all updates
// CommentStore.dispatchToken = AppDispatcher.register((action) => {
//   var text;

//   switch(action.actionType) {

//     case ZhishiConstants.QUESTION_UPDATE:
//       if (action.data && action.data.comments) {
//         loadComments(get_meta('questions', action.data.id), action.data.comments)
//         loadAnswersComments(action.data.answers);
//         CommentStore.emitChange();
//       }
//       break;

//     case ZhishiConstants.COMMENT_INDEX:
//       if (action.data && action.data.comments) {
//         loadComments(action.data.meta, action.data.comments)
//         CommentStore.emitChange();
//       }
//       break;

//     // case ZhishiConstants.ANSWER_UPDATE:
//     //   if (action.data && action.data.comments) {
//     //     loadComments("answers", action.data.id, action.data.comments)
//     //     CommentStore.emitChange();
//     //   }
//     //   break;

//     case ZhishiConstants.COMMENT_NEW:
//       if (action.data) {
//         _new(action.data.resource_name, action.data.resource_id)
//         CommentStore.emitChange();
//       }
//       break;

//     case ZhishiConstants.COMMENT_EDIT:
//       if (action.data) {
//         edit(action.data.meta, action.data.id)
//         CommentStore.emitChange();
//       }
//       break;


//     case ZhishiConstants.COMMENT_CREATE:
//       if (action.data && action.data.comment) {
//         update(action.data.meta, action.data.comment);
//       }
//       CommentStore.emitChange();
//       break;

//     case ZhishiConstants.COMMENT_UPDATE:
//       if (action.data && action.data.comment) {
//         update(action.data.meta, action.data.comment);
//       }
//       CommentStore.emitChange();
//       break;

//     case ZhishiConstants.COMMENT_UPDATE_VOTES:
//       if (action.data) {
//         update_votes_count({...action.data})
//         CommentStore.emitChange();
//       }
//       break;

//     default:
//       // nothing for now
//   }
// });

// export default CommentStore;
