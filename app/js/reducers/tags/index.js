import {combineReducers} from 'redux';
import tags from './tagReducer';
import selectedTags from './selectedTagReducer';

const questionReducer = combineReducers({
  tags,
  selectedTags
});

export default questionReducer;
