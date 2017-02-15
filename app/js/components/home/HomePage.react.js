import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars
import QuestionsList from './questionsList/QuestionsList.react';
import Sidebar from '../layouts/Sidebar.react';

const HomePage = ({
  filterDiv,
  ajaxIcon,
  ajaxBool,
  questions,
  topQuestions,
  showFilterAction,
  currentPage
}) => {
  return (
     <div className="main-wrapper homepage">

       <main className="ui container main">
         <div className="ui grid">

           <div className="sixteen wide tablet sixteen wide computer column">
            <button
              className="mini ui primary button"
              onClick={showFilterAction}
             >
               Show filters
             </button>
               {filterDiv()}
           </div>

           <div className="sixteen wide tablet twelve wide computer column">
             <h2>Recent Questions</h2>
             {<QuestionsList
               questions={questions}
               current_page={currentPage}
             />}
              {ajaxIcon()}
           </div>

           <Sidebar top_questions={topQuestions} />

         </div>
       </main>

     </div>
   );
};

HomePage.propTypes = {
  filterDiv: PropTypes.func,
  ajaxIcon: PropTypes.func,
  questions: PropTypes.object,
  topQuestions: PropTypes.object,
  showFilterAction: PropTypes.func,
  currentPage: PropTypes.number
};

export default HomePage;
