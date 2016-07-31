import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars

const CommentForm = ({comment, onChange, saveComment,
                          submitBtnDisabled, cancelComment}) => {
  return (
     <form className="ui comment form">
       <div className="field">
         <textarea
           style={{height: 'auto'}}
           value={comment.content}
           onChange={onChange}>
         </textarea>
       </div>

       <button
         className="ui button"
         disabled={submitBtnDisabled}
         onClick={saveComment}>
         Post Comment
       </button>

       <button id="cancelBtn"
         className="ui basic button"
         disabled={submitBtnDisabled}
         onClick={cancelComment}>
         Cancel
       </button>
     </form>
   );
};

CommentForm.propTypes = {
  comment: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  saveComment: PropTypes.func.isRequired,
  cancelComment: PropTypes.func.isRequired,
  submitBtnDisabled: PropTypes.bool
};

export default CommentForm;
