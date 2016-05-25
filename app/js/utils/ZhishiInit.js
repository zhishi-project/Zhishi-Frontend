import QuestionActions from "../actions/QuestionActions.js";
import webAPI from "./webAPI.js";

module.exports = {
  getQuestions: function(page, tags) {
    page = page || 1;
    if (!tags && tags.length === 0) {
      webAPI.processRequest("/questions", "GET", {page: page}, (data) => {
        console.log(data);
        QuestionActions.receiveQuestions({questions: data.questions, page: page});
    });
    }
    else {
      webAPI.getFilteredQuestions("/questions/by_tags", {page: page, tag_ids: tags}, (data) => {
        console.log(data);
        QuestionActions.receiveQuestions({questions: data.questions , page: page});
      });
    }
  }
};
