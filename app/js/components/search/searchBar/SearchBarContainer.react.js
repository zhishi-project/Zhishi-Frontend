import React from 'react';
import * as SearchActions from '../../../actions/SearchActions.js';
import Common from '../../../utils/Common.js';
import MarketingConfig from '../../../config/Marketing.js';
import $ from 'jquery';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import isEmpty from '../../../utils/isEmpty';
import SearchBar from './SearchBar.react';

const searchBarState = (existingSearchResults, searchQuery) => {
  return {
    initialQuestions: existingSearchResults,
    questions: existingSearchResults,
    searchQuery: searchQuery
  };
};

var timer;

class SearchBarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = searchBarState(props.searchResults, '');
    this.onSearch = this.onSearch.bind(this);
    this.searchIcon = this.searchIcon.bind(this);
    this.clearSearchQuery = this.clearSearchQuery.bind(this);
    this.shouldShowSearchResults = this.shouldShowSearchResults.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(searchBarState(nextProps.searchResults, this.state.searchQuery));
  }

   componentDidMount() {
     this.resizeSearchBar();
     $(window).resize(this.resizeSearchBar);
   }

   onSearch(event) {
     let searchbox = event.target;
     this.searchServer(searchbox.value);

     this.setState({
       questions: this.filterSearchResults(searchbox.value),
       searchQuery: searchbox.value
     });
   }

  filterSearchResults(strToSearch) {
    let searchResults = [];
    if (strToSearch !== '') {
      searchResults = this.state.initialQuestions;
      let value;
      let title;
      searchResults = searchResults.filter(function(question) {
        value = strToSearch.toLowerCase();
        title = question.title.toLowerCase();
        return value.length > 2 ?
         (title.search(value) !== -1) :
         (title.substring(0, value.length) === value);
      });
    }
    return searchResults;
  }

  searchServer(searchQuery) {
    clearTimeout(timer);
    timer = setTimeout(this.props.actions.search, 1000, searchQuery);
  }

   resizeSearchBar() {
     var totalWidth = $('.search-area.ui.container').width();
     var searchWidth = totalWidth > 500 ?
          totalWidth - $('#askQuestion').width() - 52 :
          '100%';
     $('.search-area form').css('width', searchWidth);
     $('#searchResults').css('width', $('.search-area .ui.input').width() - 4);
   }

   searchIcon(questions) {
     // If the box is empty, no search is done
     // Once results are returned, no searching is done (until keyboard is pressed again)
     return this.state.searchQuery !== '' &&
        isEmpty(questions) ?
        <div className="ui active small inline search-box loader"></div> :
        <i className="search icon"></i>;
   }

   shouldShowSearchResults(questions) {
     return !isEmpty(questions) &&
      this.state.searchQuery !== '';
   }

  clearSearchQuery() {
    setTimeout(() => { 
      this.setState({searchQuery: ''});
    }, 500);
  }

   getSearchUrl(question) {
     return `/questions/${
      Common.createPermalink(question.id, question.title)
      }?${MarketingConfig.searchBoxTracker}`;
   }

   hideSearchBoxClass(questions) {
     return this.shouldShowSearchResults(questions) ?
     '' : 'hide';
   }

   render() {
     const {questions} = this.state;
     const hideClass = this.hideSearchBoxClass(questions);
     return (
       <SearchBar {...{questions, hideClass}}
         getSearchUrl={this.getSearchUrl}
         onSearch={this.onSearch}
         clearSearchQuery={this.clearSearchQuery}
         searchIcon={this.searchIcon} />
     );
   }
 }
/**
* @param {Object} state: from root reducer
* @param {Object} ownProps: for functions
* @return {Object}  {questions, filteredQuestions, page} for homepage
*/
function mapStateToProps(state, ownProps) {
  return {
    searchResults: state.searchResults
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(SearchActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBarContainer);
