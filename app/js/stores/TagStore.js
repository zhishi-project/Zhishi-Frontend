import BaseStore from './BaseStore';
import ZhishiConstants from '../constants/ZhishiConstants';
import Common from '../utils/Common.js';

class TagStore extends BaseStore {
  constructor() {
    super();
    this.subscribe(() => this._registerActions.bind(this));
    this._tags = {};
    this._selected_tags = [];
    this._tags_loaded = false;
  }
 loadTags(tags=[]) {
   tags.forEach(tag => this.update(tag));
   this._tags_loaded = true;
 }
  update(tag) {
    Common.update(this._tags, tag.id, tag);
  }
  selectTagForSubscription(tag) {
    if (tag && this._tags[tag.id]) {
      let status = this._tags[tag.id]['status'] === 'selected' ? '' : 'selected';
      Object.assign(this._tags[tag.id], {status});
      this.updateSelectedTag(tag.name);
    }
  }
  updateSelectedTag(tag_name) {
    let index = this._selected_tags.indexOf(tag_name);
    if (index === -1) {
      this._selected_tags.push(tag_name);
    } else {
      this._selected_tags.splice(index, 1);
    }
  }
  updateBatchTags(tags = []) {
    tags.forEach(tag => {
      Common.update(this._tags, tag.id, tag);
      this.selectTagForSubscription(tag);
    });
  }
  getAllTags() {
    return this._tags;
  }

  getSelectedTags() {
    return this._selected_tags;
  }
  tags_loaded() {
    return this._tags_loaded;
  }

  _registerActions(action) {
    switch (action.actionType) {
      case ZhishiConstants.TAG_INDEX:
        if (action.data) {
          this.loadTags(action.data.tags);
        }
        this.emitChange();
        break;

      case ZhishiConstants.TAG_SELECT:
        if (action.data) {
          this.loadTags(action.data.tags);
        }
        this.emitChange();
        break;

      case ZhishiConstants.TAG_SELECT_FOR_SUBSCRIPTION:
        if (action.data) {
          this.selectTagForSubscription(action.data);
        }
        this.emitChange();
        break;

      case ZhishiConstants.TAG_BATCH_UPDATE:
        if (action.data) {
          this.updateBatchTags(action.data);
        }
        this.emitChange();
        break;

      default:
        break;

    }
  }

}
export default new TagStore();
