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
    this.subscribe(() => this._registerActions.bind(this));
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
          this.loadSearchResult(action.data.questions);
        }
        this.emitChange();
        break;

      default:
        // Nothing for now
    }
  }
}

export default new SearchStore();
