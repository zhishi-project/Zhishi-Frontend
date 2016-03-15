let UserActions;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var ZhishiConstants = require('../constants/ZhishiConstants');

UserActions = {
  receiveUser: function(data) {
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.RECEIVE_USER,
      data: data
    })
  }
}

export default UserActions;
