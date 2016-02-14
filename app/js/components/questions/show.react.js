import React from 'react'
import Header from '../layouts/Header.react'
import Sidebar from '../layouts/Sidebar.react'
import Tags from '../layouts/Tags.react'
import NewQuestionForm from '../answers/New.react.js'
import Answers from '../answers/Index.react.js'
import Votes from "../layouts/Votes.react"
import QuestionActions from '../../actions/QuestionActions.js'
import webAPI from '../../utils/webAPI.js'
import AuthStore from '../../stores/AuthStore.js'


class Question extends React.Component {

  constructor(props, context){
    super(props)
  }

  componentDidMount()  {
    $(".share-popup").popup();
  }

  editQuestion(event){
    event.preventDefault();
    var edit_btn = event.target;
    var id = $('.ui.grid.question').data('id');
    if ($(edit_btn).html() == 'edit') {
      $(edit_btn).removeClass().addClass('ui button').html('Save');
      QuestionActions.editQuestion(id)
      $(".question-title").popup('show');
    } else {
      this.saveQuestionEdit(id, edit_btn)
    }
  }

  saveQuestionEdit(id, edit_btn){
    $(edit_btn).removeClass().addClass('item').html('edit');
    tinymce.triggerSave();
    webAPI.processRequest(`/questions/${id}`, 'PATCH', this.questionData(), QuestionActions.receiveQuestion, edit_btn)
    tinyMCE.remove();
    $(".question-title").popup('hide');
  }

  questionData(){
    var title = $(".question-title").html();
    var desc = $(".question-content .main-comment").html();
    return { title: title, content: desc }
  }

  render(){
    var question = this.props.app_state.question || {};
    var user = question.user ? question.user : {};
    var current_user = AuthStore.getCurrentUser();
    var question_edit_btn, question_delete_btn;
    var content = $.isEmptyObject(question) ? <i className="notched circle loading icon"></i> : <div dangerouslySetInnerHTML={{__html: question.content}} />
    var question_date = new Date(question.created_at)
    var share_statement = `You can past this link on slack or send directly via email: http://${window.location.host + window.location.pathname}`;
    var edit_tip = "You can click on the question title to edit it."
    var title_editor_class = question.status != '' ? 'editing editor-title' : ''
    if (current_user.id == user.id) {
      question_edit_btn = <a href="#" className="item" onClick={this.editQuestion.bind(this)}>edit</a>
      question_delete_btn = <a href="#" className="item">delete</a>
    }
    return(
      <div className="question-thread">
        <Header />

        <main className="ui container main">
          <div className="ui grid">
            <div className="twelve wide stacked column user-question-area">
              <h2 className={`question-title ${title_editor_class}`}  data-content={edit_tip} data-variation="very wide">
                {question.title || ""}
              </h2>

              <div data-id={question.id} className="ui grid question">
                <div className="row main-question">
                  {<Votes resource={question} resource_name="question" callback={QuestionActions.updateVote} />}

                  <div  className="question-content fourteen wide column">
                    <div className="tags">
                      {<Tags tags={question.tags} />}
                    </div>

                    <article className={`main-comment ${question.status}`}>
                      {content}
                    </article>

                    <div className="options">
                      {question_edit_btn}
                      <a href="#" className="item share-popup" data-content={share_statement} data-variation="very wide">share</a>
                      {question_delete_btn}
                    </div>
                    <div className="user-metadata clearfix">
                      <p className="time-ago">
                      Asked {question_date.toDateString() || "(no date )"}
                      </p>

                      <div className="two equal width ui grid">
                        <div className="fourteen wide column">
                          <p className="user-fullname">
                            {user.name || "No name yet"}
                            <span className="badges">
                              {question.points || 0}
                            </span>
                          </p>
                        </div>

                        <div className="two wide column">
                          <img src={user.image || "/assets/img/profile.jpg"} alt="profile-image" className="profile-img" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Answers answers={this.props.app_state.answers} question_id={question.id}/>

                <NewQuestionForm question_id={question.id} />
              </div>
            </div>

            <Sidebar top_questions={this.props.app_state.top_questions} />

          </div>
        </main>


      </div>
    )
  }
}
module.exports = Question;
