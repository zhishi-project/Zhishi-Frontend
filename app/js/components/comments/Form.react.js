import React from 'react'
import webAPI from '../../utils/webAPI.js'
import CommentActions from '../../actions/CommentActions.js'

class NewCommentForm extends React.Component {
  constructor(props, context){
    super(props);
   }

   submitComment(event){
     event.preventDefault();
     var comment_box = $(event.target.parentElement).find('textarea');
     var meta = this.props.meta;
     var resource_id = meta.resource_id;
     webAPI.processRequest(`/${meta.resource_name}/${meta.resource_id}/comments`, 'POST', { content: $(comment_box).val() }, (data) => {
       CommentActions.receiveComment({meta: meta, comment: data})
     })
   }


   render () {
     return (
       <form className="ui comment form">
         <div className="field">
           <textarea style={{height:'auto'}}></textarea>
         </div>
         <button className="ui button" onClick={this.submitComment.bind(this)}>
           Post Comment
         </button>
       </form>
     )
   }
 }

 export default NewCommentForm
