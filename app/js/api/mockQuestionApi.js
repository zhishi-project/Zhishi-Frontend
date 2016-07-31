import delay from './delay';
import questions from './questions';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

class QuestionApi {
  static getAllQuestions() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign({}, questions));
      }, delay);
    });
  }

  static getAnswer(questionId, answersId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign({}, questions));
      }, delay);
    });
  }

  static saveAnswer(questionId, content) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign({}, questions[1].answers[0]));
        // reject('Just hating');
      }, delay);
    });
  }

  static saveQuestion(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign({}, questions[1]));
      }, delay);
    });
  }

  static deleteQuestion(courseId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfQuestionToDelete = courses.findIndex(course => {
          course.courseId === courseId;
        });
        courses.splice(indexOfQuestionToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default QuestionApi;
