import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars
import Common from '../../utils/Common';
import {Link} from 'react-router';

/* eslint-disable camelcase*/

const AnswerUser = ({created_at, user}) => {
  let userPermalink = Common.createPermalink(user.id, user.name);
  let answerDate = new Date(created_at);
  return (
   <div className="user-metadata clearfix">
    <p className="time-ago">
      Answered {answerDate.toDateString() || '(no date )'}
    </p>

    <div className="two equal width ui grid">
      <div className="fourteen wide column">
        <p className="user-fullname">
          <Link to={`/users/${userPermalink}`}>
            {user.name || 'No name yet'}
          </Link>
          <span className="badges">
            {user.points || 0}
          </span>
        </p>
      </div>

      <div className="two wide column">
        <img
          src={ user.image || '/assets/img/avatar.png'}
          alt="profile-image"
          className="profile-img" />
      </div>

    </div>

  </div>
 );
};

AnswerUser.propTypes = {
  user: PropTypes.object
};

export default AnswerUser;
