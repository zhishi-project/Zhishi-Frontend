import React from 'react';
import cookie from 'js-cookie';
import ShowPage from './ShowPage.react';
import * as UserActions from '../../actions/UserActions.js';
import * as ActivityActions from '../../actions/ActivityActions.js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Auth from '../../auth';
import CVar from '../../config/CookieVariables.js';
import $ from 'jquery';
import * as format from '../../utils/stringFormatters';
import UserAnswers from './UserAnswers.react';

class Show extends React.Component {
  constructor(props) {
    super(props);
  }

  getUserId(string) {
    let userId = '';
    string.replace(/\d/g, match => {
      userId += match;
    });
    userId = Number(userId);
    return userId;
  }

  checkIfUserExist() {
    const pathname = window.location.pathname;
    const userId = this.getUserId(pathname);
    $.ajax({
      method: 'GET',
      url: `${process.env.ENGINE_HOST}/users/${userId}`,
      headers: {
        Authorization: `Bearer ${cookie.get(CVar.jwt)}`
      }
    }).fail(err => {
      if (err.status === 404) {
        this.redirectIfNotFound();
      }
    });
  }

  redirectIfNotFound() {
    window.location = '/not-found';
  }

  componentWillMount() {
    const {userActions, activityActions, userId, currentUser} = this.props;
    userActions.loadUser(userId);
    activityActions.loadActivities(userId);
    userActions.loadUserPreference(currentUser);
  }

  createUserQuestionsDiv(question, index) {
    return (<QuestionsListItem key={index} question={question} />);
  }
  userAnswers(question, index) {
    return (<UserAnswers key={index} />);
  }
  render() {
    this.checkIfUserExist();
    return <ShowPage {...this.props} />;
  }
}

/**
* @param {Object} state: from root reducer
* @param {Object} ownProps: having userId
* @return {Object}  props for user page
*/
function mapStateToProps(state, ownProps) {
  const userId = format.getIdFromPermalink(ownProps.params.id);
  return {
    userId,
    user: state.users[userId] || {},
    currentUser: state.auth.currentUser,
    activities: state.activities.activities
  };
}

/**
* @param {Func} dispatch: from root reducer
* @return {Object}  actions to be bound
*/
function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(UserActions, dispatch),
    activityActions: bindActionCreators(ActivityActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Show);
