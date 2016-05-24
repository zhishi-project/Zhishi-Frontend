import AppDispatcher from '../dispatcher/AppDispatcher';
import BaseStore from './BaseStore';
import ZhishiConstants from '../constants/ZhishiConstants';
import Common from '../utils/Common.js'
import AnswerStore from './AnswerStore.js';

class QuestionStore extends BaseStore {
  constructor() {
    super();
    this.subscribe(() => this._registerActions.bind(this));
    this.shouldFetch = true;
    this._top_questions = {};
    this.page_mapping = {};
    this.current_page = 1;
    this._questions = {};
    this._userQuestions = [];
  }

  loadQuestions(questions) {
    if (questions) {
      Object.assign(this._questions, Common.serializeByKey(questions));
    }
  }

  loadTopQuestions(top_questions) {
    if (top_questions) {
      this._top_questions = Common.serializeByKey(top_questions);
    }
  }
  edit(id) {
    this._questions[id]['status'] = 'editing editor-content';
  }
  loadUserQuestions(questions) {
    this._userQuestions = questions;
  }
   update(question) {
     Common.update(this._questions, question.id, question);
   }
  updateVotesCount(id, data) {
    this._questions[id]['votes_count'] = data.votes_count.response;
    this._questions[id]['user_vote'] = data.value;
  }

  createPageMapping(questions, page) {
    let question_ids = [];
    questions.map(question => question_ids.push(question.id));
    this.page_mapping[page] = question_ids;
    this.current_page = page;
  }
  retrieveQuestions(ids) {
    let questions = {};
    ids.forEach(id => questions[id] = this._questions[id]);
    return questions;
  }
  getQuestion(id) {
    return this._questions[id];
  }

  getQuestions(ids) {
    let questions = ids ? this.retrieveQuestions(ids) : this._questions;
    return questions;
  }

  getTopQuestions() {
    return this._top_questions;
  }
  retrieveUserQuestions() {
    return this._userQuestions;
  }

  getPageMappingpage(page) {
    return this.page_mapping[page];
  }

  getCurrentPage() {
    return this.current_page;
  }

  shouldFetchQuestions() {
    return this.shouldFetch;
  }
  _registerActions(action) {
    switch (action.actionType) {
      case ZhishiConstants.RECEIVE_QUESTIONS:
        if (!$.isEmptyObject(action.data.questions)) {
          this.loadQuestions(action.data.questions);
          this.createPageMapping(action.data.questions, action.data.page);
        } else {
          this.shouldFetch = false;
        }
        this.emitChange();
        break;
      case ZhishiConstants.RECEIVE_TOP_QUESTIONS:
        this.loadTopQuestions(action.data.questions);
        this.emitChange();
        break;
      case ZhishiConstants.RECEIVE_USER_QUESTIONS:
        this.loadUserQuestions(action.data.questions);
        this.emitChange();
        break;

      case ZhishiConstants.QUESTION_EDIT:
        if (action.data) {
          this.edit(action.data);
          this.emitChange();
        }
        break;

      case ZhishiConstants.QUESTION_UPDATE:
        if (action.data) {
          if (AppDispatcher._isDispatching) {
            AppDispatcher.waitFor([AnswerStore.dispatchToken]);
          }
          this.update(action.data);
          this.emitChange();
        }
        break;

      case ZhishiConstants.QUESTION_UPDATE_VOTES:
        if (action.data && action.data.votes_count) {
          this.updateVotesCount(action.data.id, action.data);
          this.emitChange();
        }
        break;

      default:
        break;
    }
  }
}

export default new QuestionStore();

