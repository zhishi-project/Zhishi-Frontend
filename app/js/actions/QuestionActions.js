import AppDispatcher from '../dispatcher/AppDispatcher';
import ZhishiConstants from '../constants/ZhishiConstants';
import Common from '../utils/Common.js';
import types from '../constants/questions/actionTypes';
import webAPI from '../utils/webAPI';
import mockQuestionApi from './../api/mockQuestionApi';

var QuestionActions;

/**
* @param {Object} data: key questions and value is an array of questions
* @return {Object} containing the action type and data
*/
export function loadQuestionsSuccess(data) {
  return {type: types.LOAD_QUESTIONS_SUCCESS, data};
}

/**
* @param {Object} question: an array of questions from backend db
* @return {Object} containing the action type and data
*/
export function loadQuestionSuccess(question) {
  return {type: types.LOAD_QUESTION_SUCCESS, question};
}

/**
* @param {Object} data: an array of top questions from backend db
* @return {Object} containing the action type and data
*/
export function loadTopQuestionsSuccess(data) {
  return {type: types.LOAD_TOP_QUESTIONS_SUCCESS, data};
}

/**
* @param {Object} data: info containing total votes and resource vote belongs
* @return {Object} containing the action type and data
*/
export function updateQuestionVoteSuccess(data) {
  return {type: types.UPDATE_QUESTION_VOTE_SUCCESS, data};
}

export function displayLoader(data) {
  return {type: types.UPDATE_LOADER_STATUS, data};  
}

export function loadTopQuestions() {
  return dispatch => {
    return webAPI(`/top_questions`, 'GET', '')
      .then(data => {
        dispatch(loadTopQuestionsSuccess(data));
      });
  };
}

export function loadQuestion(questionId) {
  return dispatch => {
    return webAPI(`/questions/${questionId}`, 'GET', '')
      .then(data => {
        dispatch(loadQuestionSuccess(data));
      });
  };
}

export function loadQuestions(page, tags) {
  page = page || 1;
  let path = (tags && tags.length) ? '/questions/by_tags' : '/questions';
  return dispatch => {
    dispatch(displayLoader({shouldFetch: true}));
    return webAPI(path, 'GET', {page, tags})
      .then(data => {
        dispatch(loadQuestionsSuccess(data));
      });
  };
}

export function loadFilteredQuestions(page, tagIds) {
  page = page || 1;
  webAPI(
      '/questions/by_tags',
      'GET',
    {
      page, tagIds
    }, data => {
      actions.default.filterQuestionWithTags({
        questions: data.questions, page: page
      });
    }
  );
}

export function createQuestion(question) {
  return dispatch => {
    return webAPI(`/questions`, 'POST', question)
      .then(question => {
        sendQuestionsToSlack(question)
        dispatch(loadQuestionSuccess(question));
        return question;
      });
  };
}

export function updateQuestion({id, title, content}) {
  return dispatch => {
    return webAPI(`/questions/${id}`, 'PATCH', {title, content})
      .then(question => {
        dispatch(loadQuestionSuccess(question));
      });
  };
}

export function updateTestQuestion({id, title, content}) {
  return dispatch => {
    return mockQuestionApi.saveQuestion({title, content})
      .then(res => {
        let data = Object.assign({}, res, {id});
        dispatch(loadQuestionsSuccess(data));
      }).catch(err => console.log(err));
  };
}

export function loadAction(action, data) {
  return {
    type: action,
    data
  };
}

export function editQuestion(data) {
  return {
    type: types.EDIT_QUESTION,
    data
  };
}

function sendQuestionsToSlack(question) {
  let prefix = ['Got a bit of time?', 
                'Hey, you down?', 
                'Hey, can you help?', 'SOS'];
  if (!question) return;
  let general = `${prefix[parseInt(Math.random() * 4)]
                  }! ${question.user.name} just asked a question`;
  let personal = `${prefix[parseInt(Math.random() * 4)]
     }! ${question.user.name} just asked a question and mentioned you.`;
  Common.sendToSlack({id: question.id, 
    title: question.title,
    content: question.content,
    intro: {general, personal}
  });
}

QuestionActions = {
  createQuestion: question => {
    // QuestionActions.sendQuestionsToSlack(question)
    QuestionActions.receiveQuestion(question);
    window.location.href =
      `/questions/${Common.createPermalink(question.id, question.title)}`;
  },

  updateVote: (data) => {
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.QUESTION_UPDATE_VOTES,
      data: data
    });
  },
  filterQuestionWithTags: (data) => {
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.FILTER_QUESTIONS_WITH_TAGS,
      data: data
    });
  },

};

export default QuestionActions;
