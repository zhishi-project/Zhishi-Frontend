import Config from '../config/environment';
import fetch from 'isomorphic-fetch';
import Auth from '../auth';

/* eslint-disable camelcase */

/**
* @param {Object} feedback to send to slack
*/
export function submitFeedback(feedback) {
  sendToSlack(feedback);
}

/**
* @param {Object} feedback to send to slack
* @return {Func} fetch to be used in view
*/
function sendToSlack(feedback) {
  let prefix = [
    'Suggestions',
    'Ghen ghen. Playfully serious thoughts',
    'Where are they? Opinions'
  ];
  if (feedback) {
    let currentUser = Auth.getCurrentUser();
    let salutations = `${prefix[parseInt(Math.random() *
      prefix.length, 10)]} from ${currentUser.name}`;

    return fetch(Config.slackZhishiChannel, {
      method: 'Post',
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify(generalData(salutations, feedback))
    });
  }
}

/**
* @param {Object} salutations prefixing feedback
* @param {Object} feedback to send to slack
* @return {Object} object to send over the network
*/
function generalData(salutations, feedback) {
  return {username: Config.slackHookName,
    channel: 'the_zhishi_project',
    icon_emoji: ':ask_on_zhishi',
    attachments: [{
      fallback: salutations,
      pretext: salutations,
      color: '#666',
      text: feedback
    }]};
}
