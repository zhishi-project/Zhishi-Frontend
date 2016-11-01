import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars
import isEmpty from '../../utils/isEmpty';
import Sidebar from '../layouts/Sidebar.react';
import QuestionsList from '../home/questionsList/QuestionsList.react';
import {Link} from 'react-router';

const SearchPage = ({questions}) => {
  let headerMsg = isEmpty(questions) ?
   <span>
     We found nothing. . .
     <Link to="/questions/new">Ask a question?</Link>
   </span> :
  'What we found. . .';
  return (
     <div>

       <main className="ui container main">
         <div className="ui grid">
           <div className="twelve wide stacked column">
             <h2>{headerMsg}</h2>
             {questions && <QuestionsList {...{questions}}/>}
           </div>

           <Sidebar />

         </div>
       </main>

     </div>
   );
};

SearchPage.propTypes = {
  questions: PropTypes.object
};

export default SearchPage;
