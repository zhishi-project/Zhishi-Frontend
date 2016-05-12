import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import ZhishiConstants from '../constants/ZhishiConstants';
import assign from 'object-assign';
import Common from '../utils/Common.js';
import BaseStore from './BaseStore';

class SearchStore extends BaseStore {
  constructor() {
    super();
    this.search_results = [];
  }

  loadSearchResult(results) {
    this.search_results = results.reverse();
  }

  getSearchResults() {
    return this.search_results;
  }

  _registerActions(action) {
    switch (action.actionType) {
      case ZhishiConstants.RECEIVE_SEARCH_RESULTS:
        if (action.data) {
          loadSearchResults(action.data.questions);
        }
        SearchStore.emitChange();
        break;

      default:
        // Nothing for now
    }
  }
}

export default new SearchStore();

// var CHANGE_EVENT = 'change';
//
// var search_results = [];
//
// let loadSearchResults = (results) => {
//   search_results = results.reverse();
// }
//
// var SearchStore = assign({}, EventEmitter.prototype, {
//
//   getSearchResults: function() {
//     return search_results;
//   },
//
//   emitChange: function() {
//     this.emit(CHANGE_EVENT);
//   },
//
//   addChangeListener: function(callback) {
//     this.on(CHANGE_EVENT, callback);
//   },
//
//   removeChangeListener: function(callback) {
//     this.removeListener(CHANGE_EVENT, callback);
//   }
//
// })
//
// SearchStore.dispatchToken = AppDispatcher.register(function(action) {
//
//   switch (action.actionType) {
    // case ZhishiConstants.RECEIVE_SEARCH_RESULTS:
    //   if (action.data) {
    //     loadSearchResults(action.data.questions);
    //   }
    //   SearchStore.emitChange();
    //   break;
//     default:
//
//   }
// })
//
// export default SearchStore;
