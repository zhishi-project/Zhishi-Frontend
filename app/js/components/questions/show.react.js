import React from 'react'
import Header from '../layouts/Header.react'
import Footer from '../layouts/Footer.react'
import Sidebar from '../layouts/Sidebar.react'
import Tags from '../layouts/Tags.react'
import NewQuestionForm from '../answers/New.react.js'
import Answers from '../answers/Index.react.js'
import Comments from '../comments/Index.react.js'
import Votes from "../layouts/Votes.react"
import ShareButton from "../layouts/ShareButton.react"
import webAPI from '../../utils/webAPI.js'
import AuthStore from '../../stores/AuthStore.js'

import AnswerStore from '../../stores/AnswerStore.js'
import QuestionStore from '../../stores/QuestionStore.js'
import QuestionActions from '../../actions/QuestionActions.js'
import Common from "../../utils/Common.js"

function getQuestionState(question_id){
  if (QuestionStore.getQuestion(question_id)) {
    return {
      question: QuestionStore.getQuestion(question_id)
    }
  } else {
    if (question_id) {
      webAPI.processRequest(`/questions/${question_id}`, 'GET', "", QuestionActions.receiveQuestion)
    }
    return { question: {}}
  }
}

class Question extends React.Component {

  constructor(props, context){
    super(props)
    this.state = getQuestionState(props.question_id)
  }

  componentDidMount(){
    QuestionStore.addChangeListener(this._onChange.bind(this));
  }
  componentWillUnmount(){
    QuestionStore.removeChangeListener(this._onChange).bind(this);
  }
  _onChange() {
    this.setState(getQuestionState(this.props.question_id), this.initShowPage)
  }

  initShowPage(){
    Prism.highlightAll();
    if (this.state.question.status == "editing editor-content") {
      Common.initTinyMceTitle();
      Common.initTinyMceContent('.question');
      $(".question-title.editing").popup('show');
    }
  }

  editQuestion(event){
    event.preventDefault();
    var edit_btn = event.target;
    var id = $('.ui.grid.question').data('id');
    if ($(edit_btn).html() == 'edit') {
      $(edit_btn).removeClass().addClass('ui button').html('Save');
      QuestionActions.editQuestion(id)
    } else {
      this.saveQuestionEdit(id, edit_btn)
      $(".question-title.editing").popup('destroy');
    }
  }

  saveQuestionEdit(id, edit_btn){
    $(edit_btn).removeClass().addClass('item').html('edit');
    tinymce.triggerSave();
    webAPI.processRequest(`/questions/${id}`, 'PATCH', this.questionData(), QuestionActions.receiveQuestion, $(edit_btn))
    Common.removeTinyMce('.question');
    $(".question-title").popup('hide');
  }

  questionData(){
    let title = $(".question-title").html();
    let desc = $(".question-content .main-comment").html();
    return { title: title, content: desc }
  }

  render(){
    let question = this.state.question || {};
    let user = question.user ? question.user : {};
    let current_user = AuthStore.getCurrentUser();
    let question_edit_btn, question_delete_btn;
    let content = $.isEmptyObject(question) ? <i className="notched circle loading icon"></i> : <div dangerouslySetInnerHTML={{__html: Common.replaceAtMentionsWithLinks(question.content)}} />
    let question_date = new Date(question.created_at)
    let share_statement = `You can past this link on slack or send directly via email: http://${window.location.host + window.location.pathname}`;
    let question_dom_id = `question-${question.id}`;
    let text_to_copy = `http://${window.location.host + window.location.pathname}`;
    let edit_tip = "You can click on the question title to edit it."
    let title_editor_class = question.status != '' ? 'editing editor-title' : ''
    let comments_meta = {question_id: this.props.question_id, resource_name: "questions", resource_id: this.props.question_id}
    let userPermalink = Common.createPermalink(user.id, user.name);
    if (current_user.id == user.id) {
      question_edit_btn = <a href="#" className="item" onClick={this.editQuestion.bind(this)}>edit</a>
      question_delete_btn = <a href="#" className="item">delete</a>
    }
    return(
      <div className="question-thread">
        <Header />

        <main className="ui container main">
          <div className="ui grid">
            <div className="sixteen wide tablet twelve wide computer column question user-question-area">
              <h2 className={`question question-title ${title_editor_class}`}  data-content={edit_tip} data-variation="very wide">
                {question.title || ""}
              </h2>

              <div data-id={question.id} className="ui grid question">
                <div className="row main-question">
                  {<Votes
                    resource={question}
                    resource_name="question"
                    callback={QuestionActions.updateVote}
                   />}

                  <div  className="question-content fourteen wide column">
                    <div className="tags">
                      {<Tags tags={question.tags} />}
                    </div>

                    <article className={`question main-comment ${question.status}`}>
                      {content}
                    </article>

                    <div className="options">
                      {question_edit_btn}
                      <ShareButton type="question" dom_id={question_dom_id} text_to_copy={text_to_copy} custom_class="item" />
                      {question_delete_btn}
                    </div>

                    <div className="user-metadata clearfix">
                      <p className="time-ago">
                      Asked {question_date.toDateString() || "(no date )"}
                      </p>

                      <div className="two equal width ui grid">
                        <div className="fourteen wide column">
                          <p className="user-fullname username">
                            <a href={`/users/${userPermalink}`}>{user.name || "No name yet"}</a>
                            <span className="badges">
                              {user.points || 0}
                            </span>
                          </p>
                        </div>

                        <div className="two wide column">
                          <img src={user.image || "/assets/img/avatar.png"} alt="profile-image" className="profile-img" />
                        </div>
                      </div>
                    </div>

                    <Comments comments={this.props.comments} meta={comments_meta} />
                  </div>
                </div>

                <Answers question={question}/>

                <NewQuestionForm question_id={this.props.question_id} />
              </div>
            </div>

            <Sidebar  />

          </div>
        </main>
        <Footer />

      </div>
    )
  }
}
export default Question;
