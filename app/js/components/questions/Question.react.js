import React from 'react';

export function getQuestionId(permalink) {
  return permalink ? permalink.split('-')[0] : null;
}

const Question = props => {
  return (
      <div className="full-height">
        <div className="main-wrapper">
          {props.children && React.cloneElement(props.children, {
            questionId: getQuestionId(props.params.id)
          })}
        </div>
      </div>
  );
};

export default Question;
