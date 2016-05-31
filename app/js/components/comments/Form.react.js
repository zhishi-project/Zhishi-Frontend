import React from 'react'
import webAPI from '../../utils/webAPI.js'
import CommentActions from '../../actions/CommentActions.js'

class NewCommentForm extends React.Component {
  constructor(props, context){
    super(props);
    this.submitComment = this.submitComment.bind(this);
   }

   submitComment(event){
     event.preventDefault();
     const { submitBtn, commentBox } = this.refs;
     $(submitBtn).prop( "disabled", true )
     const { comment, meta } = this.props;
     const { path, action, callback } = this.getRequestMeta(comment, meta);
     webAPI.processRequest(path, action, { content: commentBox.value }, (data) => {
       callback({meta: meta, comment: data})
     }, $(submitBtn))
   }

   getRequestMeta(comment, meta) {
     const { resource_name, resource_id } = meta;
     let path, action, callback;
     if (comment) {
        path = `/${resource_name}/${resource_id}/comments/${comment.id}`;
        action = 'PATCH';
        callback = CommentActions.receiveComment
     } else {
       path = `/${resource_name}/${resource_id}/comments`;
       action = "POST";
       callback = CommentActions.createComment
     }
     return { path, action, callback }
   }

   render () {
     var comment = this.props.comment || {};
     return (
       <form className="ui comment form">
         <div className="field">
           <textarea style={{height:'auto'}} refs="commentBox" defaultValue={comment.content}></textarea>
         </div>
         <button ref="submitBtn" className="ui button" onClick={this.submitComment}>
           Post Comment
         </button>
         <a id="cancelBtn" className="ui button" data-id={comment.id} onClick={this.props.cancelComment}>
           Cancel
         </a>
       </form>
     )
   }
 }

 export default NewCommentForm
