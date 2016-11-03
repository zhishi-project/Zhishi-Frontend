import React from 'react';
import ModalEffects from '../mixins/ModalEffects.react';
import * as FeedbackActions from '../../actions/FeedbackActions';
import toastr from 'toastr';

/*
  Feedback modal
  All modal behaviour is gotten from ModalEffects
  which acts as a Higher Order Component.
*/

class FeedbackModal extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm() {
    FeedbackActions.submitFeedback(this.refs.feedbackText.value)
    .then(() => toastr.success('Thanks for your feedback'))
    .catch(() => toastr.error('Something prevented your feedback from being sent. Please try again :('))
    this.refs.feedbackText.text = '';
    this.refs.submitBtn.disabled = true;
  }

  render() {
    let {options} = this.props;
    return (
      <div id={`${options.modalId}`} className="md-modal" ref="feedbackModal">
        <div className="modal-container">
          <div className="header">
            <h4 ref="headerText">
              How could zhishi be more useful to you?
            </h4>
            <p>
              Not everyone. You.
            </p>
          </div>
          <div className="main content">
            <div className="ui grid feedback container">
              <div className="ui form">
                <div className="field">
                  <textarea ref="feedbackText" placeholder="Type those cool features here..."></textarea>
                </div>
                <div ref="submitBtn" onClick={this.submitForm} className={`md-close ui submit button `}>Submit</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default ModalEffects(FeedbackModal);
