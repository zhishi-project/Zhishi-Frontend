import QuestionActions from '../actions/QuestionActions.js';
import webAPI from './webAPI.js';

import $ from 'jquery';

module.exports = {
  getQuestions: function(page, tags) {
    page = page || 1;
    let path = $.isEmptyObject(tags) ? '/questions' : '/questions/by_tags';
    webAPI.processRequest(
      path,
      'GET',
      {
        page, tags
      }, data => {
        QuestionActions.receiveQuestions({
          questions: data.questions, page: page
        });
      }
    );
  },

  getFilteredQuestions: (page, tagIds) => {
    page = page || 1;
    webAPI.processRequest(
      '/questions/by_tags',
      'GET',
      {
        page, tagIds
      }, data => {
        QuestionActions.filterQuestionWithTags({
          questions: data.questions, page: page
        });
      }
    );
  }
};
