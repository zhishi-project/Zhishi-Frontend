import React from 'react'
import CommentActions from '../../actions/CommentActions.js'
import CommentStore from '../../stores/CommentStore.js'
import NewForm from './Form.react'
import Common from "../../utils/Common"

let getFormState = (resource_name, resource_id) => {
  return {
    show_new_form: CommentStore.getNewCommentFormStatus(resource_name, resource_id)
  }
}


class NewQuestionForm extends React.Component {
  constructor(props, context){
    super(props)
    this.cancelComment = this.cancelComment.bind(this);
    this.state = getFormState(props.meta.resource_name, props.meta.resource_id)
   }

   componentDidMount(){
     CommentStore.addChangeListener(this._onChange.bind(this));
   }

   componentWillUnmount(){
     CommentStore.removeChangeListener(this._onChange);;
   }

   _onChange(){
     this.setState(getFormState(this.props.meta.resource_name, this.props.meta.resource_id));
   }

   showNewForm(event){
     event.preventDefault();
     CommentActions.newComment({
       resource_name: this.props.meta.resource_name,
       resource_id: this.props.meta.resource_id
     });
   }

   cancelComment(event){
     event.preventDefault();
     this.setState({show_new_form: false})
   }

   render () {
     let new_comment = this.state.show_new_form
     ? <NewForm meta={this.props.meta} cancelComment={this.cancelComment}  />
     : <a href="#" className="new-comment-link" onClick={this.showNewForm.bind(this)}>
      Add a comment
    </a>
     return (
       <div className="new-comment-actions">
        {new_comment}
       </div>

     )
   }
 }
 export default NewQuestionForm;
