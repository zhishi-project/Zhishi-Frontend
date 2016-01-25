import React from "react"
import Home from './Home.react.js';
import Login from './Login.react.js'

class Zhishi extends React.Component {
  constructor(props, context){
    super(props);
  }

  render(){

    var Body = this.props.CurrentUser && $.isObjectEmpty(this.props.CurrentUser) ? Home : Login
    return (
      <div>
        <Body />
      </div>
    )
  }
}

module.exports = Zhishi;
