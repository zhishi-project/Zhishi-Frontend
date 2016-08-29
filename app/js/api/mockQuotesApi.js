import quotes from './quotes';

export default class QuotesApi {
  static getAllQuotes() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(Object.assign({}, quotes));
      });
    });
  }
}
