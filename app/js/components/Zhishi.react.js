import React from "react"


require("../../css/semantic.min.css");
require("../../css/prism.min.scss");
require("../../css/main.css");
require("../../css/custom.scss");



class Zhishi extends React.Component {
  constructor(props, context){
    super(props);
    this.state = {};
  }


  render(){
    return (
      <div className="full-height">
        {this.props.children && React.cloneElement(this.props.children, {
          app_state: this.state
        })}
      </div>
    )
  }
}

module.exports = Zhishi;
