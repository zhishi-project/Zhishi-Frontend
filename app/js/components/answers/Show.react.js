import React from 'react'
import AnswerActions from '../../actions/AnswerActions.js'
import webAPI from '../../utils/webAPI.js'
import AuthStore from '../../stores/AuthStore.js'


class AllAnswers extends React.Component {
  constructor(props, context){
    super(props)
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
     tinyMCE.remove();
   }

   questionData(){
     var desc = $(".answer-comment .main-comment").html();
     return { content: desc }
   }

   render () {
     let answer = this.props.answer || {};
     let user = answer.user || {};
     let current_user = AuthStore.getCurrentUser();
     let answer_edit_btn, answer_delete_btn;
     let answer_date = new Date(answer.created_at)
     let share_statement = `You can past this link on slack or send directly via email: http://${window.location.host + window.location.pathname }#comment-${answer.id}`;

     if (current_user.id == user.id) {
       answer_edit_btn = <a href="#" className="item" data-question-id={answer.question_id}  data-id={answer.id} onClick={this.editAnswer.bind(this)}>edit</a>
       answer_delete_btn = <a href="#" className="item">delete</a>
     }
     return (
       <div id={`comment-${answer.id}`} className="row answer-comment">
         <div className="two wide column">
           <div className="rate-up"></div>
           <div className="rate-count">{answer.points || 0}</div>
           <div className="rate-down"></div>
         </div>

         <div className="fourteen wide column">
           <div className={`main-comment ${answer.status}`}>
             <div dangerouslySetInnerHTML={{__html: answer.content}} />
           </div>

           <div className="options">
             {answer_edit_btn}
             <a href="#" className="item share-popup" data-content={share_statement} data-variation="very wide">share</a>
             {answer_delete_btn}
           </div>
            <div className="user-metadata clearfix">
             <p className="time-ago">
               Answered {answer_date.toDateString() || "(no date )"}
             </p>

             <div className="two equal width ui grid">
               <div className="fourteen wide column">
                 <p className="user-fullname">
                   Innocent T. Amadi
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
         </div>
       </div>
     )
   }
 }
 export default AllAnswers;
