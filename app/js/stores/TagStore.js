var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ZhishiConstants = require('../constants/ZhishiConstants');
var assign = require('object-assign');
import Common from '../utils/Common.js'

var CHANGE_EVENT = 'change';

var _tags = {}, _selected_tags = [];

const loadTags = (tags) => {
  if (tags) assign(_tags, Common.serializeByKey(tags))
}

const selectTagsForSubscription = (tag) => {
  if (_tags[tag.id]) {
    let status = _tags[tag.id]['status'] == 'selected' ? '' : 'selected'
    assign(_tags[tag.id], { status } )
    updateSelectedTags(tag.name)
  }
}

const updateSelectedTags = (tag_name) => {
  let index = _selected_tags.indexOf(tag_name);
  if (index == -1) {
    _selected_tags.push(tag_name)
  } else {
    _selected_tags.splice(index, 1)
  }
}

var SearchStore = assign({}, EventEmitter.prototype, {

  getAllTags: function() {
    return _tags;
  },

  getSelectedTags: function() {
    return _selected_tags;
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

})

SearchStore.dispatchToken = AppDispatcher.register(function(action) {

  switch (action.actionType) {
    case ZhishiConstants.TAG_INDEX:
      if (action.data) {
        loadTags(action.data.tags);
      }
      SearchStore.emitChange();

    case ZhishiConstants.TAG_SELECT:
      if (action.data) {
        loadTags(action.data.tags);
      }
      SearchStore.emitChange();

    case ZhishiConstants.TAG_SELECT_FOR_SUBSCRIPTION:
      if (action.data) {
        selectTagsForSubscription(action.data);
      }
      SearchStore.emitChange();

    default:
      break

  }
})

export default SearchStore;
