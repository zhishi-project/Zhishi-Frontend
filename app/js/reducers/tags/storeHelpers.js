import * as enums from '../../utils/enumsHelpers.js';
import assign from 'object-assign';

/**
* @param {Object} state: current user
* @param {Object} user to be made current user
* @return {object} return user
*/
export function loadTags(state, tags = []) {
  return assign({}, state, enums.serializeByKey(tags));
}

/**
* @param {Object} tags: current user
* @param {Object} tag to be made current user
* @return {object} return user
*/
export function changeTagStatus(tags, tag) {
  if (tag && tags[tag.id]) {
    let status = tags[tag.id].status === 'selected' ?
      '' :
      'selected';
    return enums.update(tags, tag.id, assign({}, tags[tag.id], {status}));
  }
  return tags;
}

/**
* @param {Object} selectedTags: user selection
* @param {Object} tagName name of tag user just selected
* @param {Object} forceUpdate not yet sure. . .
* @return {object} return user
*/
export function selectTagForSubscription(selectedTags, tagName, forceUpdate) {
  let index = selectedTags.indexOf(tagName);
  if (index === -1) {
    return [...selectedTags, tagName];
  } else if (index !== -1 && !forceUpdate) {
    return [...selectedTags.filter(tag => tag.name !== tagName)];
  }
  return selectedTags;
}

export function loadUserSusbcribedTags(state, tags = []) {
  let selectedTags = [...state];
  for (let key in tags) {
    if (tags.hasOwnProperty(key)) {
      selectedTags = selectTagForSubscription(selectedTags,
                      tags[key].name, true);
    }
  }
  return selectedTags;
}
