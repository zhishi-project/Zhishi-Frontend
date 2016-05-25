import React from 'react'
import Header from '../layouts/Header.react'
import Footer from '../layouts/Footer.react'
import Sidebar from '../layouts/Sidebar.react'
import UserActions from '../../actions/UserActions.js'
import UserStore from '../../stores/UserStore.js'
import AuthStore from '../../stores/AuthStore.js'
import webAPI from '../../utils/webAPI.js'
import QuestionStore from '../../stores/QuestionStore.js'
import TagStore from '../../stores/TagStore.js'
import TagActions from '../../actions/TagActions.js';
import QuestionActions from '../../actions/QuestionActions.js';

import SettingsSection from './Settings.react';
import ProfileTagSection from './ProfileTag.react';
import UserAnswers from './UserAnswers.react';

import QuestionsList from '../questions/QuestionsList.react'
import QuestionsListItem from '../questions/QuestionsListItem.react'

import TagModal from '../partials/TagModal.react'




function getUserState(user_id){
  if (user_id && !UserStore.getUser(user_id)) {
  }
  return {
    user: (UserStore.getUser(user_id) || {} ),
    current_user: AuthStore.getCurrentUser(),
    userQuestions: QuestionStore.retrieveUserQuestions()
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
    webAPI.processRequest(`/users/${user_id}/questions`,
      "GET", null, QuestionActions.recieveUserQuestions);
      // webAPI.processRequest(`/users/${user_id}/activities`,
      //   "GET", null, (data) => {
      //     debugger;
      //     QuestionActions.recieveUserQuestions
      //   });
  }

  componentDidMount(){
    QuestionStore.addChangeListener(this._onChange.bind(this));
    UserStore.addChangeListener(this._onChange.bind(this));
    // TagStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount(){
    UserStore.removeChangeListener(this._onChange).bind(this);
    QuestionStore.removeChangeListener(this._onChange.bind(this));
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
    let { current_user, user } = this.state;
    let modalId = "selectTagModal";
    return (
      <div className="main-wrapper">
        <Header />

        <main className="ui container main">
          <div className="ui stackable grid">

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
                      {user.questions_asked} questions asked, {user.answers_given} answers given
                    </a>
                  </div>

                </div>
              </div>

              <div className="seven wide column">
                <h2>
                  {user.name}
                </h2>
                <ProfileTagSection tags={user.tags || []} modalTrigger={`${modalId}-trigger`} />
              </div>
            { /*<SettingsSection /> */}

          </div>

          <div className="ui grid">
            <div className="sixteen wide tablet twelve wide computer column">
              <div className="ui divider"></div>
              <h2>My Questions</h2>
              <div className="ui divider"></div>
             {this.state.userQuestions ? this.state.userQuestions.map(this.createUserQuestionsDiv) : null}
          </div>
          </div>

          <div className="ui grid">
            <div className="sixteen wide tablet twelve wide computer column">
                {/*<div className="ui divider"></div>*/}
                {/*<h2>Answers by me</h2>*/}
                {/*[1,3].map(this.userAnswers)*/}
            </div>
          </div>

          {<TagModal  options={{modalId, closable: true}} />}



        </main>

        <Footer />

      </div>
    )
  }
}

module.exports = Show;
