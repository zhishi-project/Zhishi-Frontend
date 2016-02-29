import React from 'react'
import Header from '../layouts/Header.react'
import Sidebar from '../layouts/Sidebar.react'
import webAPI from '../../utils/webAPI.js'
import QuestionActions from '../../actions/QuestionActions.js'
import Common from "../../utils/Common"
import TagInputBox from './TagBoxes.react'

class NewQuestion extends React.Component {
  constructor(props, context){
    super(props)
   }

   componentDidMount(){
     Common.initTinyMceContent('.ask-question');
   }

   createQuestion(event){
     event.preventDefault();
     tinymce.triggerSave();
     var title = $("form #new_question_title").val();
     var desc = $("form #new_question_desc").val();
     var tags = [];
     $("#selected-tags").children().each(function(){ tags.push($(this).html())})
     var question_data = { title: title, content: desc, tags: tags }
     webAPI.processRequest('/questions', 'POST', question_data, QuestionActions.createQuestion, $(".submitQuestionBtn")[0])
   }
   
   render () {
     return (
       <div className="ask-question">
          <Header />
           <main className="ui container main">
             <div className="ui grid">
               <div className="twelve wide column">
                 <h2>New Question</h2>

                 <div className="new-question">
                   <form className="ui form">
                     <div className="ui grid">
                       <div className="ui row group">
                         <div className="two wide column label-wrapper">
                           <label>
                             Title:
                           </label>
                         </div>

                         <div className="fourteen wide column">
                           <input type="text" id="new_question_title" placeholder="Enter question" required />
                         </div>
                       </div>

                        <div className="ui row group">
                         <div className="two wide column label-wrapper">
                           <label>
                             Details:
                           </label>
                         </div>

                         <div className="fourteen wide column">
                           <textarea id="new_question_desc" cols="30" rows="15" className="editor-content"></textarea>
                         </div>
                       </div>

                       <TagInputBox />
                       <div className="ui row">
                         <div className="fourteen wide column">
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
     )
   }
 }
 module.exports = NewQuestion
