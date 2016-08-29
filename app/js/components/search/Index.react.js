import React from 'react';

import * as searchActions from '../../actions/SearchActions.js';
import webAPI from '../../utils/webAPI.js';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import SearchPage from './SearchPage.react';

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    <SearchPage
      {...this.props}
      {...this.state} />
    ;
  }
}

 /**
 * @param {Object} state: from root reducer
 * @param {Object} ownProps: for functions
 * @return {Object}  {questions, filteredQuestions, page} for homepage
 */
function mapStateToProps(state, ownProps) {
  return {
    question: state.searchResults,
    currentUser: state.auth.currentUser
  };
}

/**
* @param {Func} dispatch: from root reducer
* @return {Object}  actions to be bound
*/
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(searchActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Comment);
