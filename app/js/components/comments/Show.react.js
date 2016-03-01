import React from 'react'
import CommentActions from '../../actions/CommentActions.js'
import webAPI from '../../utils/webAPI.js'
import AuthStore from '../../stores/AuthStore.js'
import Votes from "../layouts/CommentVotes.react"
import EditCommentForm from './Form.react'
import ShareButton from "../layouts/ShareButton.react"
import Common from '../../utils/Common.js'

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
     var meta = this.props.meta || {}
     var id = $(edit_btn).data('id');
     CommentActions.editComment({meta: meta, id: id})
   }

   saveCommentEdit(resource_id, id, edit_btn){
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
     let comment_dom_id = `${meta.resource_name}-comment-${comment.id}`;
     let text_to_copy = `http://${window.location.host + window.location.pathname }#${comment_dom_id}`;
     if (current_user.id == user.id) {
       comment_edit_btn = <a href="#" className="reply" data-resource-id={meta.resource_id}  data-id={comment.id} onClick={this.editComment.bind(this)}>edit</a>
       comment_delete_btn = <a href="#" className="reply">delete</a>
     }
     let content = comment.status == 'editing' ? <EditCommentForm comment={comment} meta={meta} /> : <div dangerouslySetInnerHTML={{__html: Common.replaceAtMentionsWithLinks(comment.content)}} />

     return (
       <div id={comment_dom_id} className={`comment  ${comment.status}`}>
       {<Votes resource={comment} meta={meta} callback={CommentActions.updateVote} />}
         <div className="content">
           <a className="author">{user.name}</a>
           <div className="metadata">
             <span className="date">On {comment_date.toDateString() || "(no date )"}</span>
           </div>
           <div className={`text main-comment ${comment.status}`}>
             {content}
           </div>
           <div className="actions">
            {comment_edit_btn}
            <ShareButton type="comment" dom_id={comment_dom_id} text_to_copy={text_to_copy} custom_class='reply' />
            {comment_delete_btn}
           </div>
         </div>
         <div className="ui dividing header"></div>
      </div>
     )
   }
 }
 export default AllComments;
