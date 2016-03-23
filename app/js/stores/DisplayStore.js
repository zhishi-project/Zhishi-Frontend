var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ZhishiConstants = require('../constants/ZhishiConstants');
var assign = require('object-assign');


var CHANGE_EVENT = 'change';

var _quotes = [
  "A problem shared is a problem half-solved! - <em>Daniel Chinedu</em>",
  "The art and science of asking questions is the source of all knowledge. - <em>Thomas Berger</em>",
  "Once you start asking questions, innocence is gone. - <em>Mary Astor</em>",
  "I'm always looking, and I'm always asking questions. - <em>Anne Rice</em>",
  "Going on-line and asking questions is the best way to learn. - <em>Tom Felton</em>",
  "I love doing what I do. I love asking questions. I love being in the mix. - <em>Larry King</em>",
  "Judge a man by his questions rather than by his answers. ― <em>Voltaire</em>",
  "The scientist is not a person who gives the right answers, he's one who asks the right questions. ― <em>Claude Lévi-Strauss</em>",
  "Most misunderstandings in the world could be avoided if people would simply take the time to ask... ― <em>Shannon L. Alder</em>",
  "Courage doesn’t happen when you have all the answers. It happens when you are ready to face the questions you have been avoiding your whole life. ― <em>Shannon L. Alder</em>",
  "The Wilderness holds answers to more questions than we have yet learned to ask. ― <em>Nancy Wynne Newhall</em>",
  "I don't pretend we have all the answers. But the questions are certainly worth thinking about. - <em>Arthur C. Clarke</em>",
  "The wise man doesn't give the right answers, he poses the right questions.- <em>Claude Levi-Strauss</em>",
  "I never learn anything talking. I only learn things when I ask questions. - <em>Lou Holtz</em>",
  "Ask the right questions if you're going to find the right answers. - <em>Vanessa Redgrave</em>",
  "Asking the right questions takes as much skill as giving the right answers. - <em>Robert Half</em>",
  "What people think of as the moment of discovery is really the discovery of the question. - <em>Jonas Salk</em>",
  "He who asks a question is a fool for five minutes; he who does not ask a question remains a fool forever. - <em>Chinese proverb</em>"
];

let loadQuotes = () => {
  // when we load from an API
}

let DisplayStore = assign({}, EventEmitter.prototype, {

  getQuotes: () => {
    return _quotes;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
DisplayStore.dispatchToken = AppDispatcher.register((action) => {

  switch(action.actionType) {



    // case ZhishiConstants.QUESTION_UPDATE:
    //   if (action.data && action.data.answers) {
    //     loadAnswers(action.data.id, action.data.answers)
    //   }
    //   break;

    default:
      // nothing for now
  }
});

export default DisplayStore;
