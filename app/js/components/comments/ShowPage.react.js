import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars
import AuthStore from '../../stores/AuthStore.js';
import ManageCommentForm from './ManageCommentForm.react';
import ManageVotes from '../votes/ManageVotes.react';
import ShareButton from '../layouts/ShareButton.react';
import Common from '../../utils/Common.js';
import {Link} from 'react-router';
import assign from 'object-assign';

const votesMeta = meta => {
  return assign({}, meta, {owner: 'comment'});
};
const ShowPage = ({comment, meta, editComment,
                    actions, updateVote, cancelComment}) => {
  let commentEditBtn;
  let commentDeleteBtn;
  let user = comment.user || {};
  let currentUser = AuthStore.getCurrentUser();
  let commentDate = new Date(comment.created_at);
  let commentDomId = `${meta.resource_name}-comment-${comment.id}`;
  let textToCopy = `http://${window.location.host +
                    window.location.pathname }#${commentDomId}`;

  if (currentUser.id === user.id) {
    commentEditBtn = <a className="reply"
                      onClick={editComment}>edit</a>;
    commentDeleteBtn = <a href="#" className="reply">delete</a>;
  }

  let content = comment.editing ?
    <ManageCommentForm
      comment={comment}
      meta={meta}
      actions={actions}
      cancelComment={cancelComment} /> :
    Common.replaceAtMentionsWithLinks(comment.content);

  let userPermalink = Common.createPermalink(user.id, user.name);

  return (
     <div id={commentDomId} className={`comment  ${comment.editing}`}>

       <ManageVotes
         resource={comment}
         meta={votesMeta(meta)}
         callback={updateVote} />

       <div className="content">
         <Link
           to={`/users/${userPermalink}`}
           className="author">
           {user.name}
         </Link>

         <div className="metadata">
           <span className="date">
             On {commentDate.toDateString() || '(no date )'}
           </span>
         </div>

         <div className={`text main-comment ${comment.editing}`}>
           {content}
         </div>

         <div className="actions">
          {commentEditBtn}

          <ShareButton
            type="comment"
            dom_id={commentDomId}
            text_to_copy={textToCopy}
            custom_class="reply" />

          {commentDeleteBtn}
         </div>
       </div>
       <div className="ui dividing header"></div>
    </div>
   );
};

ShowPage.propTypes = {
  comment: PropTypes.object,
  meta: PropTypes.object,
  editComment: PropTypes.func,
  actions: PropTypes.object,
  cancelComment: PropTypes.func,
  updateVote: PropTypes.func
};

export default ShowPage;
