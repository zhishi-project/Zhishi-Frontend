let ActivityActions;

let AppDispatcher = require('../dispatcher/AppDispatcher');
let ZhishiConstants = require('../constants/ZhishiConstants');

ActivityActions = {

  recieveActivities: (data) => {
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.ACTIVITY_INDEX,
      data: data
    });
  }

}

export default ActivityActions;
