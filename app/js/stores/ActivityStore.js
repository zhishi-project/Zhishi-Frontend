import ZhishiConstants from '../constants/ZhishiConstants';
import BaseStore from './BaseStore';

class ActivityStore extends BaseStore {
  constructor() {
    super();
    this.activities = [];
    this.subscribe(() => this._registerActions.bind(this));
  }

  loadActivities(activities) {
    this.activities = activities;
  }

  getActivities() {
    return this.activities;
  }

  _registerActions(action) {
    switch (action.actionType) {
      case ZhishiConstants.ACTIVITY_INDEX:
        if (action.data) {
          this.loadActivities(action.data.activities);
        }
        this.emitChange();
        break;

      default:
        // Nothing for now
    }
  }
}

export default new ActivityStore();
