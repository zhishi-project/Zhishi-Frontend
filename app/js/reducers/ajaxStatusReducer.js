import * as types from '../constants/ajax/actionTypes';

const initialState = 0;

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === '_SUCCESS';
}

function ajaxCallEnded(type) {
  return (type === 'AJAX_CALL_ERROR' || actionTypeEndsInSuccess(type));
}

export default function ajaxStatusReducer(state = initialState, action) {
  if (action.type === types.BEGIN_AJAX_CALL) {
    return state + 1;
  } else if (ajaxCallEnded(action.type)) {
    return state - 1;
  }
  return state;
}
