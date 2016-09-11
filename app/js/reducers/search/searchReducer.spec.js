import expect from 'expect';
// import * as types from '../actions/tags/actionTypes';
import searchReducer from './searchReducer';
import * as actions from '../../actions/SearchActions';

describe('Search Reducer Test', () => {
  it('should load search results to store on LOAD_SEARCH_SUCCESS', () => {
    // setup
    const initialState = [];
    const searchResults = [
      {id: 1, title: 'first searchResult'},
      {id: 2, title: 'second searchResult'}
    ];
    const action = actions.loadSearchSuccess(searchResults);

    // action
    const newState = searchReducer(initialState, action);

    // assertions
    expect(newState).toEqual(searchResults);
  });
});
