let UserActions;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var ZhishiConstants = require('../constants/ZhishiConstants');

UserActions = {
  receiveUser: function(data) {
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.RECEIVE_USER,
      data: data
    })
  },

  updateCurrentUser: function(user) {
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.CURRENT_USER_UPDATE,
      data: user
    })
  }
}

export default UserActions;
