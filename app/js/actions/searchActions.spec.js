import expect from 'expect';
import * as SearchActions from './SearchActions';
import * as types from '../constants/search/actionTypes';

describe('loadSearchSuccess', () => {
  describe('Create load Search Action', () => {
    it('should create a LOAD_SEARCH_SUCCESS action', () => {
      // setup
      const results = [
        {id: 1, name: 'created search result'}
      ];
      const expectedAction = {
        type: types.default.LOAD_SEARCH_SUCCESS,
        results
      };

      // actions
      const action = SearchActions.loadSearchSuccess(results);

      // assertions
      expect(action).toEqual(expectedAction);
    });
  });
});
