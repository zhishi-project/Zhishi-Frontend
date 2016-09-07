import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars
import TagInputBox from './TagBoxes.react';
import Sidebar from '../../layouts/Sidebar.react';
import TinyMCE from 'react-tinymce';
import tinymceConfig from '../../../config/tinymceConfig.js';

const NewQuestionPage = ({
  onUpdateQuestionState,
  onUpdateTags,
  onSubmitClick}) => {
  let titleTip = 'It\'ll be super nice if this title is \
   a summarized and descriptive question ¯\\_(ツ)_/¯';
  return (
     <div className="ask-question">
         <main className="ui container main">
           <div className="ui grid">
             <div className="sixteen wide tablet twelve wide computer column">
               <h2>New Question</h2>

               <div className="new-question">
                 <form className="ui form">
                   <div className="ui grid">
                     <div className="ui row group">
                       <div className="sixteen wide mobile \
                        two wide tablet two wide computer \
                        column label-wrapper">
                         <label>
                           Question:
                         </label>
                       </div>

                       <div className="sixteen wide mobile \
                        fourteen wide tablet \
                        fourteen wide computer column">
                         <input
                           type="text" id="new_question_title"
                           className="title"
                           onChange={event => {
                             onUpdateQuestionState('title',
                             event.target.value);
                           }}
                           placeholder="How do I install \
                           software on Andela NAS?"
                           required />
                         <div className="tips"></div>

                       </div>
                     </div>

                      <div className="ui row group">
                       <div className="sixteen wide mobile \
                        two wide tablet two wide computer \
                        column label-wrapper">
                         <label>
                           Details:
                         </label>
                       </div>

                       <div className="sixteen wide mobile \
                         fourteen wide tablet \
                         fourteen wide computer column">

                         <TinyMCE
                           content=""
                           config={
                             tinymceConfig
                             .forContent(`#questionContent-${'new'}`)
                           }
                           className="content"
                           data-id="content"
                           onChange={event => {
                             onUpdateQuestionState('content',
                             event.target.getContent());
                           }}
                           value="" />

                       </div>
                     </div>

                     <TagInputBox onUpdateTags={onUpdateTags} />

                     <div className="ui row group">
                       <div
                         className="sixteen wide mobile \
                         fourteen wide tablet fourteen wide \
                         computer column right floated">
                         <button
                           id="submitQuestionBtn"
                           className="ui button"
                           onClick={onSubmitClick}>
                           Post Question
                         </button>
                       </div>
                     </div>
                   </div>
                 </form>
               </div>

             </div>

             <Sidebar />
           </div>
         </main>
      </div>
   );
};

NewQuestionPage.propTypes = {
  onUpdateQuestionState: PropTypes.func,
  onUpdateTags: PropTypes.func,
  onSubmitClick: PropTypes.func
};

export default NewQuestionPage;
