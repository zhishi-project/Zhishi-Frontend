import {combineReducers} from 'redux';
import answers from './answerReducer';

const answersReducer = combineReducers({
  answers
});

export default answersReducer;
