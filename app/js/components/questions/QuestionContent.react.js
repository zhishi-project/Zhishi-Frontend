import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars
import TinyMCE from 'react-tinymce';
import tinymceConfig from '../../config/tinymceConfig.js';
import Common from '../../utils/Common.js';
import ReactMarkdown from 'react-markdown';

const QuestionContent = ({question, onChange}) => {
  return question.editing ?
       <textarea
         content={question.content}
         value={question.content}
         className="content"
         onChange={onChange} /> :
        <ReactMarkdown 
          source={question.content}
          htmlMode='raw' />;
};

QuestionContent.propTypes = {
  question: PropTypes.object,
  onChange: PropTypes.func
};

export default QuestionContent;
