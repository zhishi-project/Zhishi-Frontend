import React from 'react';
import TagSelection from '../tags/homepage/TagSelection.react';
import * as ZhishiInit from '../../utils/ZhishiInit.js';
import HomePage from './HomePage.react';
import {connect} from 'react-redux';

import $ from 'jquery';

export class Index extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showFilters: false,
      selectedTags: []
    };

    this.showFilterAction = this.showFilterAction.bind(this);
    this.onTagSelect = this.onTagSelect.bind(this);
    this.loadTagSelection = this.loadTagSelection.bind(this);
  }

  componentDidMount() {
    var self = this;
    let nextPage = this.state.currentPage;
    $(window).on('scroll', function() {
      if ($(window).scrollTop() + $(window).height() === $(document).height()) {
        nextPage++;
        ZhishiInit.getQuestions(nextPage, self.state.selectedTags);
      }
    });
  }

  componentWillUnmount() {
    $(window).unbind('scroll');
  }

  shouldComponendUpdate() {
    return this.props.page.shouldFetch;
  }

  onTagSelect(e) {
    let selectedTags = this.state.selectedTags;
    selectedTags = this.populateArray(e, selectedTags);
    if (selectedTags.length > 0) {
      ZhishiInit.getQuestions();
    } else {
      ZhishiInit.getFilteredQuestions(null, selectedTags);
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
    return this.props.page.shouldFetch ?
      <i className="notched center circle loading icon"></i> :
      null;
  }

  render() {
    const {questions, topQuestions, page} = this.props;
    return <HomePage
              filterDiv={this.filterDiv}
              ajaxIcon={this.ajaxIcon}
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
function mapStateToProps(state) {
  return {
    ...state.questions,
    currentUser: state.auth.currentUser
  };
}

export default connect(mapStateToProps)(Index);
