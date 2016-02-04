import React from "react"

import AuthStore from '../../stores/AuthStore.js'
import QuestionStore from '../../stores/QuestionStore.js'
import ZhishiInit from '../../utils/ZhishiInit.js';



// make api call if user is logged in
if (!$.isEmptyObject(AuthStore.userLoggedIn())) { ZhishiInit.getInitData(); }

function getZhishiState(item_id){
  return {
    question: QuestionStore.getQuestion(item_id),
  }
}

class Zhishi extends React.Component {
  constructor(props, context){
    super(props);
    this.state = getZhishiState(props.params.item_id);
  }

  componentDidMount(){
    QuestionStore.addChangeListener(this._onChange.bind(this));
  }
  componentWillUnmount(){
    QuestionStore.removeChangeListener(this._onChange).bind(this);

  }
  _onChange() {
    this.setState(getZhishiState())
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
