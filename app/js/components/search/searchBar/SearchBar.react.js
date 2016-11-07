import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars
import {Link} from 'react-router';

const SearchBar = ({
  questions,
  hideClass,
  onSearch,
  getSearchUrl,
  clearSearchQuery,
  searchIcon
}) => {
  return (
     <div className="search-area ui container">
       <form action="/search" method="GET" className="ui search">
         <div className="ui icon input">
           <input
             id="searchInputBox"
             name="q" type="text"
             className="prompt"
             placeholder="Check if someone's asked that..."
             onBlur={clearSearchQuery}
             autoComplete="off"
             onChange={onSearch} />

           {searchIcon(questions)}
         </div>
         <button className="search ui button" type="submit">
           Search
         </button>
       </form>
       <Link id="askQuestion" to="/questions/new" className="ui button">
       Ask a Question
     </Link>
       <div id="searchResults" className={hideClass}>
          <ul>
          {questions && questions.map(question =>
           <li key={question.id}>
             <Link to={getSearchUrl(question)}>
               {question.title}
              </Link>
           </li>)}
          </ul>
       </div>
     </div>
   );
};

SearchBar.propTypes = {
  getSearchUrl: PropTypes.func,
  questions: PropTypes.array,
  hideClass: PropTypes.string,
  onSearch: PropTypes.func,
  clearSearchQuery: PropTypes.func
};

export default SearchBar;
