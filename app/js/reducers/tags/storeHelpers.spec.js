import expect from 'expect';
import * as storeHelpers from './storeHelpers';

describe('loadTags', () => {
  it('should return a serialized object for tags array', () => {
    // setup
    const initialState = {};
    const tags = [
      {id: 1, name: 'first tag'},
      {id: 2, name: 'second tag'}
    ];

    // action
    let state = storeHelpers.loadTags(initialState, tags);

    // assertions
    expect(state[1]).toEqual(tags[0]);
  });
});

describe('selectTagForSubscription', () => {
  it('should add a tag name to the array of selected tags', () => {
    // setup
    const selectedTags = ['first tag', 'second tag'];
    const selectedTagName = 'third tag';

    // action
    let result = storeHelpers
      .selectTagForSubscription(selectedTags, selectedTagName);
    let tagInArray = result.find(name => name === selectedTagName);

    // assertions
    expect(result.length).toEqual(3);
    expect(tagInArray).toEqual(selectedTagName);
  });
});

describe('loadUserSusbcribedTags', () => {
  it(['should return an array of names of tags',
      'the user is subscribed to'].join(''), () => {
    // setup
    const initialState = [];
    const tags = [
      {id: 1, name: 'first tag'},
      {id: 2, name: 'second tag'}
    ];

    // action
    let state = storeHelpers
      .loadUserSusbcribedTags(initialState, tags);

    // assertions
    expect(state[0]).toEqual(tags[0].name);
  });
});
