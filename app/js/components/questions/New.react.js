import React from 'react'
import Header from '../layouts/Header.react'
import Sidebar from '../layouts/Sidebar.react'
import webAPI from '../../utils/webAPI.js'
import QuestionActions from '../../actions/QuestionActions.js'
import Mixins from "../../utils/mixins"

class NewQuestion extends React.Component {
  constructor(props, context){
    super(props)
   }

   componentDidMount(){
     Mixins.initTinyMce()
   }

   createQuestion(event){
     debugger;
     event.preventDefault();
     tinymce.triggerSave();
     var title = $("form #new_question_title").val();
     var desc = $("form #new_question_desc").val();
     var tags = $("form #new_question_tags").val();
     var question_data = { title: title, content: desc, tags: tags }
     webAPI.processRequest('/questions', 'POST', question_data, QuestionActions.createQuestion, $(".submitQuestionBtn")[0])
   }
   render () {
     // create onClick function to handle ajax request to ask question
     // stop default propagation
     // redirect to show question page after success from actioncreator
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
                           <textarea id="new_question_desc" cols="30" rows="15" className="editor-instance"></textarea>
                         </div>
                       </div>

                       <div className="ui row group">
                         <div className="two wide column label-wrapper">
                           <label>
                             Tags:
                           </label>
                         </div>

                         <div className="fourteen wide column">
                           <input id="new_question_tags" type="text" placeholder="Javascript, Angular Js, React" required />
                         </div>
                       </div>

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
