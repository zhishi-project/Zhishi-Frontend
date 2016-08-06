import React from 'react'; // eslint-disable-line no-unused-vars
import Activity from './Activity.react';

const compliment = activityCount => {
  switch (true) {
    case (activityCount < 5) :
      return 'not contributed much yet. . .';
    case (activityCount <= 20) :
      return 'been helpful. . .';
    case (activityCount <= 50) :
      return 'been very helpful . . .';
    case (activityCount <= 100) :
      return 'been super helpful. . .';
    default:
      return 'been amazing!';

  }
};

const Activities = ({activities, user, currentUser}) => {
  let activitiesArray = [];
  let index = 0;
  let pronoun = user.id === currentUser.id ? 'You' : user.name;
  let verb = user.id === currentUser.id ? 'have' : 'has';
  let activityCount = 0;
  if (activities) {
    activityCount = activities.length;
    activities.forEach(activity => {
      if (activity.activity_on) {
        activitiesArray.push(
          <Activity
            key={index++}
            {...{activity, user, pronoun}} />);
      }
    });
  }

  return (
    <div className="ui grid">
      <div className="sixteen wide tablet twelve wide computer column">
        <div className="ui divider"></div>
        <h3 className="activity-header">
          {pronoun} {verb} {compliment(activityCount)}
        </h3>
        <div className="ui divider"></div>
        <div className="ui large feed">
          {activitiesArray}
        </div>
      </div>
    </div>
  );
};

export default Activities;
