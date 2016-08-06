import expect from 'expect';
// import * as types from '../actions/tags/actionTypes';
import tagReducer from './tagReducer';
import * as actions from '../../actions/TagActions';

describe('Tag Reducer Test', () => {
  it('should load tags to store on LOAD_TAGS_SUCCESS', () => {
    // setup
    const initialState = {};
    const tags = [
      {id: 1, name: 'first tag'},
      {id: 2, name: 'second tag'}
    ];
    const action = actions.loadTagsSuccess(tags);

    // action
    const newState = tagReducer(initialState, action);

    // assertions
    expect(Object.keys(newState).length).toEqual(2);
    expect(newState[1].name).toEqual(tags[0].name);
  });

  it('should change tag status on SELECT_TAG_FOR_SUBSCRIPTION', () => {
    // setup
    const initialState = {
      1: {name: 'first tag'},
      2: {name: 'second tag'}
    };
    const selectedTag = {id: 2};
    const action = actions.selectTagForSubscription(selectedTag);

    // action
    const updatedState = tagReducer(initialState, action);
    // const updatedSelectedTagReducer = updatedState.find(a => a.id === selectedTag.id);
    // const untouchedSelectedTagReducer = updatedState.find(a => a.id === 'A');

    // assertions
    expect(updatedState[2].status).toEqual('selected');
  });
});
