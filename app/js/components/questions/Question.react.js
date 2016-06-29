import React from "react"

const Question = (props) => {
    return (
      <div className="full-height">
        <div className="main-wrapper">
          {props.children && React.cloneElement(props.children, {
            question_id: props.params.id ? props.params.id.split('-')[0]: null
          })}
        </div>
      </div>
    );
}
export default Question;
