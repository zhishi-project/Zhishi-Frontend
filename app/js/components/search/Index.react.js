import React from 'react';

import searchActions from '../../actions/SearchActions.js';
import webAPI from '../../utils/webAPI.js';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import SearchPage from './SearchPage.react';

function getSearchState(searchQuery, firstLoad) {
  if (searchQuery && firstLoad) {
    webAPI('/questions/search', 'GET', searchQuery, SearchActions.receiveSearchResults);
  }
  return {
    questions: SearchStore.getSearchResults(),
    currentUser: AuthStore.getCurrentUser()
  };
}

class Search extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = getSearchState(props.location.query, true);
  }

  componentDidMount() {
    SearchStore.addChangeListener(this._onChange.bind(this));
  }
  componentWillUnmount() {
    SearchStore.removeChangeListener(this._onChange);

  }
  _onChange() {
    this.setState(getSearchState());
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
    question: questions.searchResults,
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
