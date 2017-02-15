import * as webAPI from './../utils/webAPI.js';

/*
  The success callback exists in the question, answer or comment action
  Depending on which resource own the vote. It is passed in the view (Votes.js)
*/

/**
* @param {Object} meta: containing question id and resource name
* @param {Object} action: 'up' or 'down'
* @param {Object} callback: success action - question, answer or comment vote success
* @return {Object} containing the action type and data
*/
export function updateVote({resource, action, meta, callback}) {
  let value = action === 'up' ? 1 : -1;
  return dispatch => {
    return webAPI.processRequest(`/${meta.owner}s/${resource.id}/${action}vote`,
      'POST', '')
      .then(votesCount => {
        let votesData = {id: resource.id, votesCount, meta, value};
        dispatch(callback(votesData));
        return votesCount;
      }).catch(err => {
        throw err;
      });
  };
}
