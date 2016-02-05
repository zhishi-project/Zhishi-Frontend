import React from "react"

import QuestionStore from '../../stores/QuestionStore.js'
import QuestionActions from '../../actions/QuestionActions.js'
import webAPI from '../../utils/webAPI.js'



function getZhishiState(question_id){
  if (QuestionStore.getQuestion(question_id)) {
    return {
      question: QuestionStore.getQuestion(question_id),
    }
  } else {
    webAPI.processRequest(`/questions/${question_id}/answers`, 'GET', "", QuestionActions.receiveQuestion)
    return {}
  }
}

class Question extends React.Component {
  constructor(props, context){
    super(props);
    this.state = getZhishiState(props.params.id);
  }

  componentDidMount(){
    QuestionStore.addChangeListener(this._onChange.bind(this));
  }
  componentWillUnmount(){
    QuestionStore.removeChangeListener(this._onChange).bind(this);

  }
  _onChange() {
    this.setState(getZhishiState(this.props.params.id))
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

module.exports = Question;
