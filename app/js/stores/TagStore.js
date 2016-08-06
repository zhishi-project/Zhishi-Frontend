import BaseStore from './BaseStore';
import ZhishiConstants from '../constants/ZhishiConstants';
import Common from '../utils/Common.js';

class TagStore extends BaseStore {
  constructor() {
    super();
    this.subscribe(() => this._registerActions.bind(this));
    this.tags = {};
    this.selectedTags = [];
    this.tagsLoadedState = false;
  }
 loadTags(tags = []) {
   tags.forEach(tag => this.update(tag));
   this.tagsLoadedState = true;
 }
  update(tag) {
    Common.update(this.tags, tag.id, tag);
  }
  selectTagForSubscription(tag, forceUpdate) {
    if (tag && this.tags[tag.id]) {
      let status = this.tags[tag.id]['status'] === 'selected' ?
      '' :
      'selected';
      Object.assign(this.tags[tag.id], {status});
      this.updateSelectedTag(tag.name, forceUpdate);
    }
  }
  updateSelectedTag(tagName, forceUpdate) {
    let index = this.selectedTags.indexOf(tagName);
    if (index === -1) {
      this.selectedTags.push(tagName);
    } else if (index !== -1 && !forceUpdate) {
      this.selectedTags.splice(index, 1);
    }
  }
  updateBatchTags(tags = []) {
    tags.forEach(tag => {
      Common.update(this.tags, tag.id, tag);
      this.selectTagForSubscription(tag, true);
    });
  }
  getAllTags() {
    return this.tags;
  }

  getSelectedTags() {
    return this.selectedTags;
  }
  tagsLoaded() {
    return this.tagsLoadedState;
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
        // this.emitChange();
        break;

      default:
        break;

    }
  }

}
export default new TagStore();
