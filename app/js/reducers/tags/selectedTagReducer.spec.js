import expect from 'expect';
import selectedTagReducer from './selectedTagReducer';
import * as AuthActions from '../../actions/AuthActions';
import * as TagActions from '../../actions/TagActions';

describe('SelectedTag Reducer Test', () => {
  it(['should load user tags as selected tags',
      'on LOAD_CURRENT_USER_SUCCESS'].join(''), () => {
    // setup
    const initialState = [];
    const user = {
      tags: {
        1: {name: 'first tag'},
        2: {name: 'second tag'}
      }
    };
    const action = AuthActions.loadCurrentUserSuccess(user);

    // action
    const newState = selectedTagReducer(initialState, action);

    // assertions
    expect(newState.length).toEqual(2);
    expect(newState[0]).toEqual(user.tags[1].name);
  });

  it(['should update selected tags',
      'when passed SELECT_TAG_FOR_SUBSCRIPTION'].join(''), () => {
    // setup
    const initialState = ['first tag', 'second tag'];
    const selectedTag = {id: 2, name: 'new tag'};
    const action = TagActions.selectTagForSubscription(selectedTag);

    // action
    const updatedState = selectedTagReducer(initialState, action);
    const newlyAddedTag = updatedState
              .find(tagName => tagName === selectedTag.name);

    // assertions
    expect(updatedState.length).toEqual(3);
    expect(newlyAddedTag).toEqual(selectedTag.name);
  });
});
