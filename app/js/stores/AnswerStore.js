import BaseStore from './BaseStore';
import ZhishiConstants from '../constants/ZhishiConstants';
import Common from '../utils/Common.js';

class AnswerStore extends BaseStore {
  constructor() {
    super();
    this.subscribe(() => this._registerActions.bind(this));
    this._answers = {};
    this._top_answers = {};
  }
  loadAnswers(question_id, answers) {
    answers = Common.serializeByKey(answers);
    Common.update(this._answers, question_id, answers, true);
  }

  edit(data) {
    this._answers[data.question_id][data.id]['status'] = 'editing editor-content';
  }

  update(answer) {
    Common.update(this._answers[answer.question_id], answer.id, answer);
  }
  getAnswer(question_id, id) {
    return this._answers[question_id][id];
  }

  getAnswers(question_id) {
    return this._answers[question_id];
  }
  getTopAnswers() {
    return this._top_answers;
  }
  update_votes_count(data) {
    this._answers[data.meta.question_id][data.id]['votes_count'] = data.votes_count.response;
    this._answers[data.meta.question_id][data.id]['user_vote'] = data.value;
  }
  _registerActions(action) {
    switch (action.actionType) {

      case ZhishiConstants.QUESTION_UPDATE:
        if (action.data) {
          this.loadAnswers(action.data.id, action.data.answers);
          this.emitChange();
        }
        break;

      case ZhishiConstants.ANSWER_INDEX:
        if (action.data) {
          this.loadAnswers(action.data.question_id, action.data.answers);
          this.emitChange();
        }
        break;

      // case ZhishiConstants.QUESTION_UPDATE:
      //   if (action.data && action.data.answers) {
      //     loadAnswers(action.data.id, action.data.answers)
      //   }
      //   break;

      case ZhishiConstants.ANSWER_EDIT:
        if (action.data) {
          this.edit(action.data);
          this.emitChange();
        }
        break;

      case ZhishiConstants.ANSWER_UPDATE:
        if (action.data) {
          this.update(action.data);
          this.emitChange();
        }
        break;

      case ZhishiConstants.ANSWER_UPDATE_VOTES:
        if (action.data) {
          this.update_votes_count(action.data);
          this.emitChange();
        }
        break;

      default:
        // nothing for now
    }
  }
}

export default new AnswerStore();
