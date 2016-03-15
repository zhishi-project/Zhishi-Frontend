var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ZhishiConstants = require('../constants/ZhishiConstants');
var assign = require('object-assign');
import Common from '../utils/Common.js'

var CHANGE_EVENT = 'change';

var search_results = [];

let loadSearchResults = (results) => {
  search_results = results.reverse();
}

var SearchStore = assign({}, EventEmitter.prototype, {

  getSearchResults: function() {
    return search_results;
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
    case ZhishiConstants.RECEIVE_SEARCH_RESULTS:
      if (action.data) {
        loadSearchResults(action.data.questions);
      }
      SearchStore.emitChange();
      break;
    default:

  }
})

export default SearchStore;
