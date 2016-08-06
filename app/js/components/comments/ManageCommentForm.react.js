import React, {PropTypes} from 'react';
import CommentForm from './CommentForm.react';
import toastr from 'toastr';

function getState(comment, submitBtnDisabled) {
  return {comment, submitBtnDisabled};
}

class ManageCommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = getState(this.props.comment, false);
    this.onCommentChange = this.onCommentChange.bind(this);
    this.saveComment = this.saveComment.bind(this);
  }

  onCommentChange(event) {
    this.setState({comment: Object.assign({},
                              this.state.comment,
                              {content: event.target.value}
                            )});
  }

  preSave(event) {
    event.preventDefault();
    this.setState({submitBtnDisabled: true});
  }

  saveComment(event) {
    this.preSave(event);
    const {actions, meta} = this.props;
    const {comment} = this.state;
    actions.saveComment(meta, comment, this.getRequestUrl(comment, meta))
    .then(() => this.saveSuccess())
    .catch(err => this.saveError(err));
  }

  getRequestUrl(comment, meta) {
    const {resourceName, resourceId} = meta;
    let id = comment ? comment.id : null;
    let action = id ? 'PATCH' : 'POST';
    return {path: `/${resourceName}/${resourceId}/comments/${id}`, action};
  }

  saveSuccess() {
    toastr.success('Your comment have been successfully updated.');
  }

  saveError(error) {
    this.setState({submitBtnDisabled: false});
    toastr.error(error);
  }

   render() {
     return <CommentForm
             comment={this.state.comment}
             onChange={this.onCommentChange}
             saveComment={this.saveComment}
             submitBtnDisabled={this.state.submitBtnDisabled}
             cancelComment={this.props.cancelComment} />;
   }
 }

ManageCommentForm.propTypes = {
  comment: PropTypes.object,
  actions: PropTypes.object,
  cancelComment: PropTypes.func
};

export default ManageCommentForm;
