import React from 'react';
import UserActions from '../../actions/UserActions.js';
import ActivityActions from '../../actions/ActivityActions.js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import UserAnswers from './UserAnswers.react';

class Show extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  createUserQuestionsDiv(question, index) {
    return (<QuestionsListItem key={index} question={question} />);
  }
  userAnswers(question, index) {
    return (<UserAnswers key={index} />);
  }
  render() {
    return <ShowPage {...this.props} />;
  }
}

/**
* @param {Object} state: from root reducer
* @param {Object} ownProps: having userId
* @return {Object}  props for user page
*/
function mapStateToProps(state, ownProps) {
  return {
    user: state.users[ownProps.params.id] || {},
    currentUser: state.currentUser,
    activities: state.activities
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
