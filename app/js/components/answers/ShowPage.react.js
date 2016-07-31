import React, {PropTypes} from 'react';
import Common from '../../utils/Common';
import ManageVotes from '../votes/ManageVotes.react';
import Comments from '../comments/Index.react.js';
import ShareButton from '../layouts/ShareButton.react';
import TinyMCE from 'react-tinymce';
import tinymceConfig from '../../config/tinymceConfig.js';

const commentsMeta = (answer) => {
  return {
    questionId: answer.question_id,
    resourceName: 'answers',
    owner: 'answer',
    resourceId: answer.id
  };
};

const ShowPage = ({
  question,
  answer,
  currentUser,
  updateVote,
  editAnswer,
  onChange,
  acceptAnswer
}) => {
  let user = answer.user || {};
  let answerEditBtn;
  let answerDeleteBtn;
  let answerAcceptBtn;
  let acceptedAnswerRibbon;
  let acceptedAnswer;
  let answerDate = new Date(answer.created_at);
  let answerDomId = `answer-${answer.id}`;

  let answerHref = `http://${window.location.host +
            window.location.pathname}#${answerDomId}`;

  if (currentUser.id === user.id) {
    let editBtnClass = answer.editing ? 'ui button' : 'item';
    let editBtnText = answer.editing ? 'Save' : 'edit';
    answerEditBtn = <a href="#"
                      className={editBtnClass}
                      data-question-id={answer.question_id}
                      data-id={answer.id}
                      onClick={editAnswer}>{editBtnText}</a>;

    answerDeleteBtn = <a href="#" className="item">delete</a>;
  }

  if (question.user && currentUser.id === question.user.id) {
    answerAcceptBtn = (
       <a href="#" className="item" onClick={acceptAnswer}>
         accept as answer
       </a>
     );
  }

  if (answer.accepted) {
    acceptedAnswer = 'accepted';
    acceptedAnswerRibbon = <div className="ribbon">
                              <i className="checkmark icon"></i>
                            </div>;
  }

  let userPermalink = Common.createPermalink(user.id, user.name);

  let answerContent = answer.editing ?
    <TinyMCE
      content={answer.content}
      config={tinymceConfig.forContent()}
      className="content"
      data-id="content"
      onChange={onChange}
      value="" /> :
    <div dangerouslySetInnerHTML={{
      __html: Common.replaceAtMentionsWithLinks(answer.content)
    }} />;

  return (
    <div id={answerDomId} className="row answer-comment">

    <ManageVotes
      resource={answer}
      meta={commentsMeta(answer)}
      callback={updateVote} />

      <div className="fourteen wide column">
        <div
          className={`answer ${acceptedAnswer} main-comment ${answer.editing}`}>
         {acceptedAnswerRibbon}
         {answerContent}
        </div>

        <div className="options">
          {answerEditBtn}

          <ShareButton type="answer"
            dom_id={answerDomId}
            text_to_copy={answerHref}
            custom_class="item" />

          {answerDeleteBtn}
          {answerAcceptBtn}
        </div>
         <div className="user-metadata clearfix">
          <p className="time-ago">
            Answered {answerDate.toDateString() || '(no date )'}
          </p>

          <div className="two equal width ui grid">
            <div className="fourteen wide column">
              <p className="user-fullname">
                <a href={`/users/${userPermalink}`}>
                  {user.name || 'No name yet'}
                </a>
                <span className="badges">
                  {user.points || 0}
                </span>
              </p>
            </div>

            <div className="two wide column">
              <img
                src={ user.image || '/assets/img/avatar.png'}
                alt="profile-image"
                className="profile-img" />
            </div>

          </div>

        </div>

        <Comments
          comments={answer.comments}
          meta={commentsMeta(answer)} />

      </div>
    </div>
  );
  1;};

ShowPage.propTypes = {
  question: PropTypes.object,
  answer: PropTypes.object,
  currentUser: PropTypes.object,
  updateVote: PropTypes.func,
  editAnswer: PropTypes.func,
  onChange: PropTypes.func,
  acceptAnswer: PropTypes.func
};

export default ShowPage;
