var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ZhishiConstants = require('../constants/ZhishiConstants');
var assign = require('object-assign');
import AnswerStore from './AnswerStore.js'
import Common from '../utils/Common.js'

var CHANGE_EVENT = 'change';

var _questions = {}, _top_questions = {}, page_mapping = {}, current_page=1, shouldFetch = true;
var _userQuestions = [];


let loadQuestions = (questions) => {
  if ((typeof questions !== "undefined") && questions) {
    assign(_questions, Common.serializeByKey(questions))
  }
}

let loadTopQuestions = (top_questions) => {
  if (typeof top_questions !== "undefined") {
    _top_questions = Common.serializeByKey(top_questions)
  }
}

let edit = (id) => {
  _questions[id]['status'] = 'editing editor-content'
}

let loadUserQuestions = questions => {
  _userQuestions = questions;
}

let update = (question) => {
  var id = question.id;
  Common.update(_questions, question.id, question)
}

let updateVotesCount = (id, data) => {
  _questions[id]['votes_count'] = data.votes_count.response;
  _questions[id]['user_vote'] = data.value
}

let createPageMapping = (questions, page) => {
  let question_ids = [];
  questions.map(question => question_ids.push(question.id))
  page_mapping[page] = question_ids;
  current_page = page;
}

let retrieveQuestions = (ids) => {
  let questions = {};
  ids.forEach(id => questions[id] = _questions[id])
  return questions;
}

let destroy = (id) => {
  delete _questions[id];
}


let QuestionStore = assign({}, EventEmitter.prototype, {

  getQuestion: (id) => {
    return _questions[id];
  },

  getQuestions: (ids) => {
    var questions = ids ? retrieveQuestions(ids) : _questions;
    return questions;
  },

  getTopQuestions: () => {
    return _top_questions
  },
  retrieveUserQuestions: () => {
    return _userQuestions;
  },

  getPageMapping: (page) => {
    return page_mapping[page];
  },

  getCurrentPage: () => {
    return current_page;
  },

  shouldFetchQuestions: () => {
    return shouldFetch;
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
QuestionStore.dispatchToken = AppDispatcher.register((action) => {
  var text;

  switch(action.actionType) {

    case ZhishiConstants.RECEIVE_QUESTIONS:
      if ( !$.isEmptyObject(action.data.questions) ) {
        loadQuestions(action.data.questions);
        createPageMapping(action.data.questions, action.data.page);
      } else {
        shouldFetch = false;
      }
      QuestionStore.emitChange();
      break;

    case ZhishiConstants.RECEIVE_TOP_QUESTIONS:
      loadTopQuestions(action.data.questions);
      QuestionStore.emitChange();
      break;
    case ZhishiConstants.RECEIVE_USER_QUESTIONS:
      loadUserQuestions(action.data.questions);
      QuestionStore.emitChange();
      break;

    case ZhishiConstants.QUESTION_EDIT:
      if (action.data) {
        edit(action.data)
        QuestionStore.emitChange();
      }
      break;

    case ZhishiConstants.QUESTION_UPDATE:
      if (action.data) {
        if (AppDispatcher._isDispatching) { AppDispatcher.waitFor([AnswerStore.dispatchToken]) }
        update(action.data)
        QuestionStore.emitChange();
      }
      break;

    case ZhishiConstants.QUESTION_UPDATE_VOTES:
      if (action.data && action.data.votes_count) {
        updateVotesCount(action.data.id, action.data)
        QuestionStore.emitChange();
      }
      break;

    default:
      // nothing for now
  }
});

module.exports = QuestionStore;
