import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars
import {Link} from 'react-router';

const SearchBar = ({
  searchResults,
  questions,
  hideClass,
  onSearch,
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
            {searchResults}
          </ul>
       </div>
     </div>
   );
};

SearchBar.propTypes = {
  searchResults: PropTypes.array,
  questions: PropTypes.object,
  hideClass: PropTypes.string,
  onSarch: PropTypes.func
};

export default SearchBar;
