import React from 'react';
import * as AnswerActions from '../../actions/AnswerActions.js';
import TinyMCE from 'react-tinymce';
import tinymceConfig from '../../config/tinymceConfig.js';
import toastr from 'toastr';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PreviewText from '../common/PreviewText.react.js';

class NewAnswerForm extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {content: ''};
    this.submitAnswer = this.submitAnswer.bind(this);
    this.updateAnswerState = this.updateAnswerState.bind(this);
  }

   submitAnswer(event) {
     event.preventDefault();
     this.props.actions.createAnswer({...this.answerData()})
       .then(() => {
         this.resetState();
         toastr.success('Your answer has been added successfully');
       }).catch(err => {
         toastr.error(err);
       });
   }

   answerData() {
     return {
       question: this.props.question,
       content: this.state.content
     };
   }

   resetState() {
     this.setState({content: ''});
   }

   updateAnswerState(event) {
     this.setState({content: event.target.getContent()});
   }

   render() {
     return (
       <div className="row new-answer">
         <div className="sixteen wide column">
           <h3 className="title">
             Give your own answer
             <span className="tips">markdown works (some),
              for beloved emoticons, ctrl + cmd + spacebar</span></h3>

           <form id="answerForm" className="ui form">
             <div className="field">
               <TinyMCE
                 content={this.state.content}
                 config={tinymceConfig.forContent()}
                 className="new-answer editor-content"
                 onChange={this.updateAnswerState}
                 cols="30" rows="10"
                 value="" />
             </div>

             <button
               id="submitAnswerBtn"
               className="ui button"
               onClick={this.submitAnswer}>
               Post Answer
             </button>

           </form>
         </div>
         <PreviewText text={this.state.content} />
       </div>
     );
   }
 }

function mapStateToProps(state, ownProps) {
  return {question: ownProps.question};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AnswerActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewAnswerForm);
