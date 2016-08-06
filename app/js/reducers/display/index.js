import {combineReducers} from 'redux';
import quotes from './quotesReducer';

const displayReducer = combineReducers({
  quotes
});

export default displayReducer;
