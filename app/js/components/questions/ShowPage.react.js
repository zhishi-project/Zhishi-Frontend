import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars
import Sidebar from '../layouts/Sidebar.react';
import Tags from '../tags/question/Tags.react';
import NewAnswerForm from '../answers/New.react.js';
import Answers from '../answers/Index.react.js';
import Comments from '../comments/Index.react.js';
import ManageVotes from '../votes/ManageVotes.react';
import QuestionContent from './QuestionContent.react';
import QuestionHeader from './QuestionHeader.react';
import OptionButtons from './OptionButtons.react';
import QuestionUser from './QuestionUser.react';

const votesMeta = questionId => {
  return {
    questionId,
    resourceName: 'questions',
    owner: 'question'
  };
};

const ShowPage = ({
  questionId,
  question,
  updateVote,
  editQuestion,
  onChange,
  currentUser
}) => {
  let commentsMeta = {
    resourceName: 'questions',
    resourceId: questionId
  };
  return (
     <div className="question-thread">

       <main className="ui container main">
         <div className="ui grid">
           <div className="sixteen wide tablet twelve
             wide computer column question user-question-area">
             <h2
               className={`question question-title`}
               data-content=""
               data-variation="very wide">
               <QuestionHeader
                 question={question}
                 onChange={onChange} />
             </h2>

             <div data-id={question.id}
                className="ui grid question slideMessagePanelParent">
               <div className="row main-question">
                 {<ManageVotes
                   resource={question}
                   meta={votesMeta(question.id)}
                   callback={updateVote}
                  />}

                 <div className="question-content fourteen wide column">
                   <div className="tags">
                     {<Tags tags={question.tags} />}
                   </div>

                   <article className={`question main-comment ${question.editing}`}>
                     <QuestionContent
                       question={question}
                       onChange={onChange} />
                   </article>

                   <OptionButtons
                     question={question}
                     currentUser={currentUser}
                     editQuestion={editQuestion} />

                   <QuestionUser
                     question={question} />

                   <Comments meta={commentsMeta} />
                 </div>
               </div>

               <Answers
                 questionId={questionId}
                 question={question} />

               <NewAnswerForm question={question} />
             </div>

           </div>

           <Sidebar />

         </div>
       </main>

     </div>
   );
};

ShowPage.propTypes = {
  questionId: PropTypes.string,
  question: PropTypes.object,
  updateVote: PropTypes.func,
  editQuestion: PropTypes.func,
  onChange: PropTypes.func,
  currentUser: PropTypes.object
};

export default ShowPage;
