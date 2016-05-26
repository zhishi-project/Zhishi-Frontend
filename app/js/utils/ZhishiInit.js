import QuestionActions from "../actions/QuestionActions.js";
import webAPI from "./webAPI.js";

module.exports = {
  getQuestions: function(page, tags) {
    page = page || 1;
    let path = $.isEmptyObject(tags) ? '/questions' : '/questions/by_tags';
    webAPI.processRequest(path, "GET", {page, tags}, (data) => {
      QuestionActions.receiveQuestions({questions: data.questions, page: page});
    });
  },

  getFilteredQuestions: (page, tag_ids) => {
    page = page || 1;
    webAPI.processRequest("/questions/by_tags", "GET", {page, tag_ids}, (data) => {
      QuestionActions.filterQuestionWithTags({questions: data.questions, page: page});
    })
  }
};
