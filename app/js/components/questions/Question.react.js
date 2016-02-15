import React from "react"





class Question extends React.Component {
  constructor(props, context){
    super(props);
  }


  render(){
    return (
      <div className="full-height">
        {this.props.children && React.cloneElement(this.props.children, {
          question_id: this.props.params.id
        })}
      </div>
    )
  }
}

module.exports = Question;
