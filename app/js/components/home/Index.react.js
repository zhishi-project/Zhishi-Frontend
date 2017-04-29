import React from 'react';
import TagSelection from '../tags/homepage/TagSelection.react';
import {loadQuestions} from '../../actions/QuestionActions';
import * as ZhishiInit from '../../utils/ZhishiInit.js';
import HomePage from './HomePage.react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import $ from 'jquery';

export class Index extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showFilters: false,
      selectedTags: [],
      displayLoader: true
    };

    this.ajaxIcon = this.ajaxIcon.bind(this);
    this.filterDiv = this.filterDiv.bind(this);
    this.showFilterAction = this.showFilterAction.bind(this);
    this.onTagSelect = this.onTagSelect.bind(this);
    this.loadTagSelection = this.loadTagSelection.bind(this);
  }

  componentDidMount() {
    let self = this;
    let nextPage = this.props.page.currentPage;

    $(window).on('scroll', function() {
      if ($(window).scrollTop() + $(window).height() === $(document).height()) {
        nextPage++;
        self.props.addMoreQuestions(nextPage, self.state.selectedTags);
      }
    });
  }

  componentWillUnmount() {
    $(window).unbind('scroll');
  }

  componentWillReceiveProps(nextProps) {
    this.setState({displayLoader: nextProps.page.shouldFetch})
  }

  onTagSelect(e) {
    let selectedTags = this.state.selectedTags;
    selectedTags = this.populateArray(e, selectedTags);

    if (selectedTags.length > 0) {
      ZhishiInit.getQuestions(null, selectedTags);
      
    } else {
      console.log(ZhishiInit);
      
    }
  }

  populateArray(e, selectedTags) {
    if (selectedTags.indexOf(e.target.value) === -1 && e.target.checked) {
      selectedTags.push(e.target.value);
    } else {
      let index = selectedTags.indexOf(e.target.value);
      selectedTags.splice(index, 1);
    }
    return selectedTags;
  }

  loadTagSelection(tag, i) {
    return (<TagSelection onTagSelect={this.onTagSelect} tag={tag} key={i}/>);
  }

  showFilterAction() {
    this.setState({showFilters: !this.state.showFilters});
  }

  filterDiv() {
    const {currentUser} = this.props;
    return this.state.showFilters ?
      <div className="ui form"> <div className="inline fields">
        {currentUser.tags.map(this.loadTagSelection)} </div>
      </div> :
      null;
  }

  ajaxIcon() {
    return this.state.displayLoader ?
      <i className="notched center circle loading icon"></i> :
      null;
  }

  render() {
    const {questions, topQuestions, page} = this.props;
    return <HomePage
              filterDiv={this.filterDiv}
              ajaxIcon={this.ajaxIcon}
              ajaxBool={page.shouldFetch}
              questions={questions}
              topQuestions={topQuestions}
              showFilterAction={this.showFilterAction}
              currentPage={page.currentPage} />;
  }
}

/**
* @param {Object} state: from root reducer
* @param {Object} ownProps: for functions
* @return {Object}  {questions, filteredQuestions, page} for homepage
*/
function mapDispatchToProps(dispatch) {
  return {
    addMoreQuestions: bindActionCreators(loadQuestions, dispatch)
  };
}

/**
* @param {Object} state: from root reducer
* @param {Object} ownProps: for functions
* @return {Object}  {questions, filteredQuestions, page} for homepage
*/
function mapStateToProps(state) {
  return {
    ...state.questions,
    currentUser: state.auth.currentUser
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
