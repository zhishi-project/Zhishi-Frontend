import React from "react"
import SidebarPusher from './layouts/SidebarPusher.react'

require("../../css/semantic.min.css");
require("../../css/prism.css");
require("../../css/main.scss");
require("../../css/custom.scss");



class Zhishi extends React.Component {
  constructor(props, context){
    super(props);
    this.state = {};
  }


  render(){
    return (
      <div>
        <div id="zhishi-body" className="md-effect-12 full-height">
          <SidebarPusher />
          <div className="pusher">
            {this.props.children && React.cloneElement(this.props.children, {
              app_state: this.state
            })}
          </div>
        </div>
        <div className="md-overlay"></div>
      </div>
    )
  }
}

module.exports = Zhishi;
