import React, {PropTypes} from 'react';
import ManageCommentForm from './ManageCommentForm.react';

class NewCommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showNewForm: false};
    this.showNewForm = this.showNewForm.bind(this);
    this.cancelComment = this.cancelComment.bind(this);
  }

  showNewForm(event) {
    event.preventDefault();
    this.setState({showNewForm: true});
  }

  cancelComment(event) {
    if (event) event.preventDefault();
    this.setState({showNewForm: false});
  }

  getCourseForm() {
    return <ManageCommentForm
              comment={this.props.comment}
              meta={this.props.meta}
              actions={this.props.actions}
              submitBtnDisabled={this.state.submitBtnDisabled}
              cancelComment={this.cancelComment} />;
  }

  getLinkToComment() {
    return <a href="#" className="new-comment-link"
              onClick={this.showNewForm}>
             Add a comment
           </a>;
  }

  formOrLink() {
    return this.state.showNewForm ?
              this.getCourseForm() :
              this.getLinkToComment();
  }

  render() {
    let newComment = this.formOrLink();
    return (
      <div className="new-comment-actions">
       {newComment}
      </div>
    );
  }
}

NewCommentForm.propTypes = {
  comment: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default NewCommentForm;
