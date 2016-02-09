import QuestionActions from "../actions/QuestionActions.js";
import webAPI from "./webAPI.js";

module.exports = {
  getInitData: function() {
    webAPI.processRequest("/questions", "GET", {page: 1}, QuestionActions.receiveQuestions);
    webAPI.processRequest("/top_questions", "GET", {page: 1}, QuestionActions.receiveTopQuestions);
  }
};
