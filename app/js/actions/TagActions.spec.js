import expect from 'expect';
import * as TagActions from './TagActions';
import * as types from '../constants/tags/actionTypes';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

import Config from '../config/environment';

describe('loadTagsSuccess', () => {
  describe('Create load Tags Action', () => {
    it('should create a LOAD_TAGS_SUCCESS action', () => {
      // setup
      const tags = [
        {id: 1, name: 'created tag'}
      ];
      const expectedAction = {
        type: types.default.LOAD_TAGS_SUCCESS,
        tags
      };

      // actions
      const action = TagActions.loadTagsSuccess(tags);

      // assertions
      expect(action).toEqual(expectedAction);
    });
  });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('loadTags', function() {
  afterEach(() => {
    nock.cleanAll();
  });
  // this.timeout(15000);
  it.skip('should dispatch a success action on successful API response', done => {
    // setup
    const tags = [{id: 1, name: 'first tag'}];

    nock(Config.host)
    .get('/tags/recent')
    .reply(200, {body: tags});

    const expectedActions = [
      {type: types.LOAD_TAGS_SUCCESS, tags}
    ];

    // action
    const initialAppState = {tags: []};
    const store = mockStore(initialAppState, expectedActions);

    store.dispatch(TagActions.loadTags()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(types.default.LOAD_TAGS_SUCCESS);
      expect(actions[0].tags).toEqual(tags);
    });

    done();
  });
});
