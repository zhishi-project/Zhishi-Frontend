import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars
import TinyMCE from 'react-tinymce';
import tinymceConfig from '../../config/tinymceConfig.js';
import Common from '../../utils/Common.js';

const QuestionContent = ({question, onChange}) => {
  return question.editing ?
       <TinyMCE
         content={question.content}
         config={tinymceConfig.forContent(`#questionContent-${question.id}`)}
         className="content"
         data-id="content"
         onChange={onChange}
         value="" /> :
       <div dangerouslySetInnerHTML={{
         __html: Common.replaceAtMentionsWithLinks(question.content)
       }} />;
};

QuestionContent.propTypes = {
  question: PropTypes.object,
  onChange: PropTypes.func
};

export default QuestionContent;
