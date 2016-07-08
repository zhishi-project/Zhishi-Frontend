import React from 'react'
import TagStore from '../../stores/TagStore.js';
import AuthStore from '../../stores/AuthStore.js';
import UserStore from '../../stores/UserStore.js';
import QuestionStore from '../../stores/QuestionStore.js';
import ActivityStore from '../../stores/ActivityStore.js';
import TagActions from '../../actions/TagActions.js';
import UserActions from '../../actions/UserActions.js';
import ActivityActions from '../../actions/ActivityActions.js';

import webAPI from '../../utils/webAPI.js';

import UserAnswers from './UserAnswers.react';
import ProfileTagSection from './ProfileTag.react';

import Activities from '../activities/index.react';

import TagModal from '../partials/TagModal.react';

const getUserState = (user_id) => {
  return {
    user: (UserStore.getUser(user_id) || {} ),
    current_user: AuthStore.getCurrentUser(),
    activities: ActivityStore.getActivities()
  }
}

class Show extends React.Component {
  constructor(props, context){
    super(props);
    this.state = getUserState(props.user_id);
  }

  componentWillMount() {
    const { user_id } = this.props;
    webAPI.processRequest(`/users/${user_id}`, 'GET', null, UserActions.receiveUser);
    // webAPI.processRequest(`/users/${user_id}/questions`,
    //   "GET", null, QuestionActions.recieveUserQuestions);
      webAPI.processRequest(`/users/${user_id}/activities`,
        "GET", null, ActivityActions.recieveActivities);
  }

  componentDidMount(){
    QuestionStore.addChangeListener(this._onChange.bind(this));
    UserStore.addChangeListener(this._onChange.bind(this));
    ActivityStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount(){
    UserStore.removeChangeListener(this._onChange);
    QuestionStore.removeChangeListener(this._onChange);
    ActivityStore.removeChangeListener(this._onChange);
  }
  _onChange() {
    this.setState(getUserState(this.props.user_id))

  }
  createUserQuestionsDiv(question, index){
      return (<QuestionsListItem key={index} question={question} />);
  }
  userAnswers(question, index){
    return (<UserAnswers key={index} />);
  }
  render(){
    let { current_user, user, activities } = this.state;
    let modalId = "selectTagModal";
    return (
      <div className="main-wrapper">
        <main className="ui container main">
          <div className="ui stackable user-details grid">

              <div className="five wide column">
                <div className="ui card user">
                  <div className="image">
                    <img src={user.image || "/assets/img/avatar.png"} alt="Profile" />
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
                      Asked {user.questions_asked} questions. Gave {user.answers_given} answers
                    </a>
                  </div>

                </div>
              </div>

              <div className="seven wide column">
                <h2>
                  {user.name}
                </h2>
                <ProfileTagSection
                  tags={user.tags || []}
                  { ...{user, current_user}}
                  modalTrigger={`${modalId}-trigger`}
                />
              </div>
            { /*<SettingsSection />*/}
          </div>

          <Activities  { ...{user, current_user}} activities={activities} />


          <div className="ui grid">
            <div className="sixteen wide tablet twelve wide computer column">
                {/*<div className="ui divider"></div>*/}
                {/*<h2>Answers by me</h2>*/}
                {/*[1,3].map(this.userAnswers)*/}
            </div>
          </div>

          {<TagModal  options={{modalId, closable: true}} />}

        </main>

      </div>
    )
  }
}

module.exports = Show;
