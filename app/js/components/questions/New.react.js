import React from 'react';
import webAPI from '../../utils/webAPI.js';
import QuestionActions from '../../actions/QuestionActions.js';
import Common from '../../utils/Common';
import TagInputBox from './TagBoxes.react';
import Sidebar from '../layouts/Sidebar.react';
import TinyMCE from 'react-tinymce';
import tinycceConfig from '../../config/tinymceConfig.js';

class NewQuestion extends React.Component {
  constructor(props, context) {
    super(props);
  }

   componentDidMount() {
     Common.initTinyMceContent('.ask-question');
   }

   createQuestion(event) {
     event.preventDefault();
     $('#submitQuestionBtn').prop( 'disabled', true );
     tinymce.triggerSave();
     var title = $('form #new_question_title').val();
     var desc = $('form #new_question_desc').val();
     var tags = [];
     $('#selected-tags').children().each(function() { tags.push($(this).html());});
     var question_data = {title: title, content: desc, tags: tags};
     webAPI('/questions', 'POST', question_data, QuestionActions.createQuestion, $('#submitQuestionBtn'));
   }

   render() {
     let title_tip = 'It\'ll be super nice if this title is a summarized and descriptive question ¯\\_(ツ)_/¯';
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
                         <div className="sixteen wide mobile two wide tablet two wide computer column label-wrapper">
                           <label>
                             Question:
                           </label>
                         </div>

                         <div className="sixteen wide mobile fourteen wide tablet fourteen wide computer column">
                           <input type="text" id="new_question_title" placeholder="How do I install software on Andela NAS?" required />
                           <div className="tips"></div>
                         </div>
                       </div>

                        <div className="ui row group">
                         <div className="sixteen wide mobile two wide tablet two wide computer column label-wrapper">
                           <label>
                             Details:
                           </label>
                         </div>

                         <div className="sixteen wide mobile fourteen wide tablet fourteen wide computer column">
                           <textarea id="new_question_desc" cols="30" rows="15" className="ask-question editor-content"></textarea>
                         </div>
                       </div>

                       <TagInputBox />
                       <div className="ui row group">
                         <div className="sixteen wide mobile fourteen wide tablet fourteen wide computer column right floated">
                           <button id="submitQuestionBtn" className="ui button" onClick={this.createQuestion}>
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
   }
 }
module.exports = NewQuestion;
