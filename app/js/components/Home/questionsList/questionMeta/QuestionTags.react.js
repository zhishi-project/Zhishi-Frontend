import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars

const QuestionTags = ({question}) => {
  let tags = [];
  let index = 0;
  if (question && question.tags) {
    question.tags.forEach(function(tag) {
      tags.push(<span key={index++}>{tag.name}</span>);
    });
  }

  return (
     <div className="tags">
       {tags}
     </div>
   );
};

QuestionTags.propTypes = {
  question: PropTypes.object
};

export default QuestionTags;
