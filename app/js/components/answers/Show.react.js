import React from 'react'
import AnswerActions from '../../actions/AnswerActions.js'
import webAPI from '../../utils/webAPI.js'
import AuthStore from '../../stores/AuthStore.js'
import Votes from "../layouts/Votes.react"
import Comments from '../comments/Index.react.js'
import Common from "../../utils/Common"
import ShareButton from "../layouts/ShareButton.react"


class AllAnswers extends React.Component {
  constructor(props, context){
    super(props)
   }

   componentDidMount()  {
     $(".share-popup").popup();
     new Clipboard('.share-popup');
     $(".share-popup").click(function(){
       window.getSelection().removeAllRanges();
     })
   }

   editAnswer(event){
     event.preventDefault();
     var edit_btn = event.target;
     var question_id = $(edit_btn).data('question-id');
     var id = $(edit_btn).data('id');
     if ($(edit_btn).html() == 'edit') {
       $(edit_btn).removeClass().addClass('ui button').html('Save');
       AnswerActions.editAnswer({question_id: question_id, id: id})
     } else {
       this.saveAnswerEdit(question_id, id, edit_btn)
     }
   }

   saveAnswerEdit(question_id, id, edit_btn){
     $(edit_btn).removeClass().addClass('item').html('edit');
     tinymce.triggerSave();
     webAPI.processRequest(`/questions/${question_id}/answers/${id}`, 'PATCH', this.questionData(), AnswerActions.receiveAnswer, edit_btn)
     Common.removeTinyMce('.answer');
   }

   acceptAnswer() {
    debugger;
     event.preventDefault();
     webAPI.processRequest(`/questions/${this.props.question.id}/answers/${this.props.answer.id}/accept`, 'POST', {}, AnswerActions.receiveAnswer)
   }

   questionData(){
     var desc = $(".answer-comment .main-comment").html();
     return { content: desc }
   }

   render () {
     let answer = this.props.answer || {};
     let question = this.props.question || {};
     let user = answer.user || {};
     let current_user = AuthStore.getCurrentUser();
     let answer_edit_btn, answer_delete_btn, answer_accept_btn, accepted_answer_ribbon, accepted_answer;
     let answer_date = new Date(answer.created_at);
     let answer_dom_id = `answer-${answer.id}`;
     
     var answer_href = `http://${window.location.host + window.location.pathname}#${answer_dom_id}`;
     if (current_user.id == user.id) {
       answer_edit_btn = <a href="#" className="item" data-question-id={answer.question_id}  data-id={answer.id} onClick={this.editAnswer.bind(this)}>edit</a>
       answer_delete_btn = <a href="#" className="item">delete</a>
     }
     if (question.user && current_user.id === question.user.id) {
        answer_accept_btn = <a href="#" className="item" onClick={this.acceptAnswer.bind(this)}>accept as answer</a>
     }
     if (answer.accepted) {
        accepted_answer = "accepted";
        accepted_answer_ribbon = <div className="ribbon">
          <i className="checkmark icon"></i></div>
     }
     var comments_meta = {question_id: answer.question_id, resource_name: "answers", resource_id: answer.id};

     return (
       <div id={answer_dom_id} className="row answer-comment">
       {<Votes resource={answer} resource_name="answer" 
       meta={{question_id: answer.question_id}} c
       allback={AnswerActions.updateVote} />}

         <div className="fourteen wide column">
           <div className={`answer ${accepted_answer} main-comment ${answer.status}`}>
            {accepted_answer_ribbon}
             <div dangerouslySetInnerHTML={{__html: Common.replaceAtMentionsWithLinks(answer.content || "")}} />
           </div>

           <div className="options">
             {answer_edit_btn}
             <ShareButton type="answer" dom_id={answer_dom_id} text_to_copy={answer_href} custom_class="item" />
             {answer_delete_btn}
             {answer_accept_btn}
           </div>
            <div className="user-metadata clearfix">
             <p className="time-ago">
               Answered {answer_date.toDateString() || "(no date )"}
             </p>

             <div className="two equal width ui grid">
               <div className="fourteen wide column">
                 <p className="user-fullname">
                   {user.name}
                   <span className="badges">
                     {user.points || 0}
                   </span>
                 </p>
               </div>


               <div className="two wide column">
                 <img src={ user.image || "/assets/img/profile.jpg"} alt="profile-image" className="profile-img" />
               </div>
             </div>

           </div>
           <Comments comments={answer.comments} meta={comments_meta} />
         </div>
       </div>
     )
   }
 }
 export default AllAnswers;
