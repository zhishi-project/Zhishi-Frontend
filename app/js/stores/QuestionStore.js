var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ZhishiConstants = require('../constants/ZhishiConstants');
var assign = require('object-assign');
import AnswerStore from './AnswerStore.js'
import Common from '../utils/Common.js'

var CHANGE_EVENT = 'change';

var _questions = {}, _top_questions = {};


let loadQuestions = (questions) => {
  if ((typeof questions !== "undefined") && questions) {
    _questions = Common.serializeByKey(questions)
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

let update = (question) => {
  var id = question.id
  Common.update(_questions, question.id, question)
}

let update_votes_count = (id, votes_count) => {
  _questions[id]['votes_count'] = votes_count
  debugger;
}

let destroy = (id) => {
  delete _questions[id];
}


let QuestionStore = assign({}, EventEmitter.prototype, {

  getQuestion: (id) => {
    return _questions[id];
  },

  getQuestions: () => {
    return _questions
  },

  getTopQuestions: () => {
    return _top_questions
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
      loadQuestions(action.data);
      QuestionStore.emitChange();
      break;

    case ZhishiConstants.RECEIVE_TOP_QUESTIONS:
      loadTopQuestions(action.data);
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
        update_votes_count(action.data.id, action.data.votes_count.response)
        QuestionStore.emitChange();
      }
      break;

    default:
      // nothing for now
  }
});

module.exports = QuestionStore;
