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
   let status = this._comments[meta.resource_name][meta.resource_id][id]['status'];
   status = status === 'editing' ? '' : 'editing'
   this._comments[meta.resource_name][meta.resource_id][id]['status'] = status;
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
