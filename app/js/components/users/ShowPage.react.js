import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars
import ProfileTagSection from './ProfileTag.react';
import Activities from '../activities/index.react';
import TagModal from '../tags/modal/TagModal.react';
import Settings from './Settings.react';
import * as format from '../../utils/stringFormatters';

class ShowPage extends React.Component {
  constructor(props) {
    super(props);
    this.renderCurrentUserSettings = this.renderCurrentUserSettings.bind(this);
  }

  renderCurrentUserSettings() {
    const {currentUser, params} = this.props;
    let userId = format.getIdFromPermalink(params.id);
    userId = Number(userId);

    if (userId === currentUser.id) {
      return (
        <Settings {...this.props}/>
      );
    }
    return null;
  }

  render() {
    const {currentUser, user, activities} = this.props;
    let modalId = 'selectTagModal';
    let tags = currentUser.id === user.id ?
      currentUser.tags : user.tags;
    return (
      <div className="main-wrapper">
        <main className="ui container main">
          <div className="ui stackable user-details grid">

            <div className="five wide column">
              <div className="ui card user">

                <div className="image">
                  <img
                    src={user.image || '/assets/img/avatar.png'}
                    alt="Profile" />
                </div>

                <div className="content">
                  <span className="right floated">
                    <i className="heart outline like icon"></i>
                    Member since 2016
                  </span>
                  Reputation: {user.points}
                </div>

                <div className="extra content">
                  <a>
                    Asked {user.questions_asked} questions.&nbsp;
                    Gave {user.answers_given} answers
                  </a>
                </div>

              </div>
            </div>

            <div className="seven wide column">
              <h2>
                {user.name}
              </h2>
              <ProfileTagSection
                tags={tags || []}
                { ...{user, currentUser}}
                modalTrigger={`${modalId}-trigger`} />
            </div>

            <div className="four wide column">
              {this.renderCurrentUserSettings()}
            </div>
          </div>

          <Activities { ...this.props} activities={activities} />

          {<TagModal options={{modalId, closable: true}} />}

        </main>

      </div>
    );
  }
}

ShowPage.propTypes = {
  userActions: PropTypes.object,
  currentUser: PropTypes.object,
  user: PropTypes.object,
  activities: PropTypes.array
};

export default ShowPage;
