var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ZhishiConstants = require('../constants/ZhishiConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _questions = {}, _top_questions = {};

function create(data) {
  // returns a newly created image. Necessary?
}

function loadQuestions(questions) {
  if ((typeof questions !== "undefined") && questions) {
    questions.map(question => update(_questions, question.id, question))
  }
}

function loadTopQuestions(top_questions) {
  if (typeof top_questions !== "undefined") {
    top_questions.map(question => update(_top_questions, question.id, question))
  }
}

function updateQuestion(question) {
  question.answers = serializeAnswers(question.answers);
  question.answers_count = Object.keys(question.answers).length;
  update(_questions, question.id, question);
}
/**
 * Update a single Image
 */
function update(collection, id, updates) {
  collection[id] = assign({}, collection[id], updates);
}

function updateQuestionAnswer(answer) {
  if (_questions[answer.question_id]){
    if ($.isEmptyObject(_questions[answer.question_id]['answers'])) { _questions[answer.question_id]['answers'] = {} }
    debugger;
    update(_questions[answer.question_id]['answers'], answer.id, answer)
  }
}

function serializeAnswers(answers_array) {
  var answers = {};
  answers_array.map(answer => update(answers, answer.id, answer))
  return answers;
}
/**
 * Update all users within the same object.
 * Necessary for group delete or something like that.
 */
function updateAll(updates) {
  // depends on the data type of object
  // for (var id in _questions) {
  //   update(id, updates);
  // }
}

/**
 * Delete a question from the store
 */
function destroy(id) {
  delete _user[id];
}


let QuestionStore = assign({}, EventEmitter.prototype, {

  getQuestion: function(id) {
    return _questions[id];
  },

  getQuestions: function(){
    return _questions
  },

  getTopQuestions: function(){
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
QuestionStore.dispatchToken = AppDispatcher.register(function(action) {
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

    case ZhishiConstants.QUESTION_UPDATE:
      if (action.data) {
        updateQuestion(action.data)
        QuestionStore.emitChange();
      }
      break;

    case ZhishiConstants.RECEIVE_ANSWER:
      if (action.data) {
        updateQuestionAnswer(action.data);
        QuestionStore.emitChange();
      }
      break;

    default:
      // nothing for now
  }
});

module.exports = QuestionStore;
