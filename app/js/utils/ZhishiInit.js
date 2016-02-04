import QuestionActions from "../actions/QuestionActions.js";
import webAPI from "./webAPI.js";

module.exports = {
  getInitData: function() {
    webAPI.processRequest("/questions", "GET", {limit: 10, offset:1}, QuestionActions.receiveQuestions);
    webAPI.processRequest("/top_questions", "GET", {limit: 10, offset:1}, QuestionActions.receiveTopQuestions);
  }
};
