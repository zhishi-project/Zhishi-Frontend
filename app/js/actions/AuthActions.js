
var AppDispatcher = require('../dispatcher/AppDispatcher');
var ZhishiConstants = require('../constants/ZhishiConstants');

var AuthActions = {

  // Receive inital product data
  showForm: function(data) {
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.AUTH_FORM_SELECTED,
      data: data
    })
  },

  loginUser: function(data) {
    if (data._error) {
      AppDispatcher.dispatch({
        actionType: ZhishiConstants.AUTH_LOG_IN_ERROR,
        data: data
      });
    } else if (data.data) {
      AppDispatcher.dispatch({
        actionType: ZhishiConstants.RECEIVE_DATA,
        data: data.data
      });
    }
  },

  logoutUser: function() {
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.AUTH_LOG_OUT
    })
  },

  signupUser: function(id, data) {
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.AUTH_SIGN_UP,
      id: id,
      data: data
    });
  },

  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.USER_DESTROY,
      id: id
    });
  },

  /**
   * Delete all the completed Users
   */
  destroyCompleted: function() {
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.USER_DESTROY_COMPLETED
    });
  }

};

module.exports = AuthActions;
