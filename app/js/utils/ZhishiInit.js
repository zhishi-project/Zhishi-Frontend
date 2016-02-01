import QuestionActions from "../actions/QuestionActions.js";
import webAPI from "./webAPI.js";

module.exports = {
  getInitData: function() {
    webAPI.processRequest("/gen_test", "GET", "", QuestionActions.receiveInitData);
    // webAPI.processRequest("/questions", "GET", "", QuestionActions.receiveInitData);
  }
};
