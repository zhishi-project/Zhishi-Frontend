import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars
import ShareButton from '../layouts/ShareButton.react';

const OptionButtons = ({question, currentUser, editQuestion}) => {
  let questionEditBtn;
  let questionDeleteBtn;
  let questionDomId = `question-${question.id}`;
  let textToCopy = `http://${window.location.host + window.location.pathname}`;
  if (question.user && currentUser.id === question.user.id) {
    let editBtnClass = question.editing ? 'ui button' : 'item';
    let editBtnText = question.editing ? 'Save' : 'edit';
    questionEditBtn = <a href="#"
                        className={editBtnClass}
                        onClick={editQuestion}>{editBtnText}
                      </a>;
    questionDeleteBtn = <a href="#" className="item">delete</a>;
  }
  return (
     <div className="options">
       {questionEditBtn}
       <ShareButton
         type="question"
         dom_id={questionDomId}
         textToCopy={textToCopy}
         custom_class="item" />
       {questionDeleteBtn}
     </div>
   );
};

OptionButtons.propTypes = {
  question: PropTypes.object,
  currentUser: PropTypes.object,
  editQuestion: PropTypes.func
};

export default OptionButtons;
