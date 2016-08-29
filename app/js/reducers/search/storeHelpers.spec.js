import expect from 'expect';
import * as storeHelpers from './storeHelpers';

describe('loadSearchResults', () => {
  it('should return a serialized object for tags array', () => {
    // setup
    const initialState = [];
    const results = [
      {id: 1, title: 'first result'},
      {id: 2, title: 'second result'}
    ];

    // action
    let state = storeHelpers.loadSearchResults(initialState, results);

    // assertions
    expect(state).toEqual(results);
  });
});
