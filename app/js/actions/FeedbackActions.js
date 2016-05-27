var FeedbackActions;

import Config from '../config/environment.js'
import AuthStore from '../stores/AuthStore'

FeedbackActions = {

  submitFeedback: (feedback) => {
    FeedbackActions.sendToSlack(feedback);
  },

  sendToSlack: (feedback) => {
    let prefix = ['Suggestions', 'Ghen ghen. Playfully serious thoughts', 'Where are they? Opinions ']
    if (feedback) {
      let currentUser = AuthStore.getCurrentUser();
      let salutations = `${prefix[parseInt(Math.random() * prefix.length)]} from ${currentUser.name}`

      $.ajax({
        url: Config.slackZhishiChannel,
        type: 'POST',
        data: JSON.stringify(FeedbackActions.generalData(salutations, feedback) )
      });

    }
  },

  generalData: (salutations, feedback) => {
    return { username: Config.slackHookName,
      channel: 'the_zhishi_project',
      icon_emoji: ":ask_on_zhishi",
      attachments: [{
        fallback: salutations,
        pretext: salutations,
        color: '#666',
        text: feedback
    }]}
  }
}

export default FeedbackActions;
