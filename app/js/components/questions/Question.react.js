import React from "react"

import QuestionStore from '../../stores/QuestionStore.js'
import AnswerStore from '../../stores/AnswerStore.js'
import QuestionActions from '../../actions/QuestionActions.js'
import webAPI from '../../utils/webAPI.js'
import Common from "../../utils/Common"



function getZhishiState(question_id){
  if (QuestionStore.getQuestion(question_id)) {
    return {
      question: QuestionStore.getQuestion(question_id),
      answers: AnswerStore.getAnswers(question_id)
    }
  } else {
    webAPI.processRequest(`/questions/${question_id}`, 'GET', "", QuestionActions.receiveQuestion)
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
    this.setState(getZhishiState(this.props.params.id), this.initShowPage)
  }

  initShowPage(){
    Prism.highlightAll();
    // tinyMCE.activeEditor.setContent('');
    Common.initTinyMceTitle();
    Common.initTinyMceContent();
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
