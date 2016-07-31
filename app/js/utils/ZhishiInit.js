import * as actions from '../actions/QuestionActions.js';
import webAPI from './webAPI.js';
import fetch from 'isomorphic-fetch';
import courseApi from '../api/mockCourseApi';
import Config from '../config/environment.js';

export function loadData(store){
  store.dispatch(getQuestions());
  store.dispatch(actions.loadTopQuestions());
}

export function getQuestions (page, tags) {
  page = page || 1;
  let path = (tags && tags.length > 0) ? '/questions/by_tags' : '/questions';

  return dispatch => {
    return webAPI(path, 'GET', {
      page, tags
    }, data => {
      dispatch(actions.loadQuestionsSuccess({
        questions: data.questions, page: page
      }));
    });
  };
}

export function getFilteredQuestions (page, tagIds) {
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

//
// return fetch('/api/me', {
//   method: 'POST',
//   header: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     name: 'xxx'
//   })
// })
// .then(response => response.json())
// .then( json => dispatch( login( json ) ))
// .catch( err => console.log(err) )
