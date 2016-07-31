import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars
import TinyMCE from 'react-tinymce';
import tinymceConfig from '../../config/tinymceConfig.js';

const QuestionHeader = ({question, onChange}) => {
  return question.editing ?
     <TinyMCE
       content={question.title}
       config={tinymceConfig.forTitle(`.question.main-comment`)}
       className="title"
       onChange={onChange}
       value="" /> :
       question.title;
};

QuestionHeader.propTypes = {
  question: PropTypes.question,
  onChange: PropTypes.onChange
};

export default QuestionHeader;
