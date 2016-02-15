import React from 'react'
import CommentActions from '../../actions/CommentActions.js'
import webAPI from '../../utils/webAPI.js'
import AuthStore from '../../stores/AuthStore.js'
import Votes from "../layouts/CommentVotes.react"

class AllComments extends React.Component {
  constructor(props, context){
    super(props)
   }

   componentDidMount()  {
     $(".share-popup").popup();
   }

   editComment(event){
     event.preventDefault();
     var edit_btn = event.target;
     var resource_id = $(edit_btn).data('resource-id');
     var id = $(edit_btn).data('id');
     if ($(edit_btn).html() == 'edit') {
       $(edit_btn).removeClass().addClass('ui button').html('Save');
       CommentActions.editComment({resource_id: resource_id, id: id})
     } else {
       this.saveCommentEdit(resource_id, id, edit_btn)
     }
   }

   saveCommentEdit(resource_id, id, edit_btn){
     $(edit_btn).removeClass().addClass('item').html('edit');
     tinymce.triggerSave();
     webAPI.processRequest(`/resources/${resource_id}/comments/${id}`, 'PATCH', this.resourceData(), CommentActions.receiveComment, edit_btn)
     tinyMCE.remove();
   }

   resourceData(){
     var desc = $(".comment-comment .main-comment").html();
     return { content: desc }
   }

   render () {
     let comment = this.props.comment || {};
     let meta = this.props.meta || {}
     let user = comment.user || {};
     let current_user = AuthStore.getCurrentUser();
     let comment_edit_btn, comment_delete_btn;
     let comment_date = new Date(comment.created_at)
     let share_statement = `You can past this link on slack or send directly via email: http://${window.location.host + window.location.pathname }#${meta.resource_name}-comment-${comment.id}`;
     if (current_user.id == user.id) {
       comment_edit_btn = <a href="#" className="reply" data-resource-id={meta.resource_id}  data-id={comment.id} onClick={this.editComment.bind(this)}>edit</a>
       comment_delete_btn = <a href="#" className="reply">delete</a>
     }
     return (
       <div id={`${meta.resource_name}-comment-${comment.id}`} className="comment">
       {<Votes resource={comment} meta={meta} callback={CommentActions.updateVote} />}
         <div className="content">
           <a className="author">{user.name}</a>
           <div className="metadata">
             <span className="date">On {comment_date.toDateString() || "(no date )"}</span>
           </div>
           <div className={`text main-comment ${comment.status}`}>
             <div dangerouslySetInnerHTML={{__html: comment.content}} />
           </div>
           <div className="actions">
            {comment_edit_btn}
            <a href="#" className="reply share-popup" data-content={share_statement} data-variation="very wide">share</a>
            {comment_delete_btn}
           </div>
         </div>
         <div className="ui dividing header"></div>
      </div>
     )
   }
 }
 export default AllComments;
