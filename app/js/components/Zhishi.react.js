import React from "react"

import AuthStore from '../stores/AuthStore.js'
import QuestionStore from '../stores/QuestionStore.js'
import ZhishiInit from '../utils/ZhishiInit.js';


require("../../css/semantic.min.css");
require("../../css/main.css");

// make api call if user is logged in
if (!$.isEmptyObject(AuthStore.userLoggedIn())) { ZhishiInit.getInitData(); }

function getZhishiState(){
  return {
    questions: QuestionStore.getQuestions(),
    current_user: AuthStore.getCurrentUser()
  }
}

class Zhishi extends React.Component {
  constructor(props, context){
    super(props);
    this.state = getZhishiState();
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
