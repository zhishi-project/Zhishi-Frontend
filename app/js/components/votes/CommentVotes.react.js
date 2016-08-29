import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars

const CommentVotes = ({resource, upvote}) => {
  return (
     <div className="points-holder">
       <div data-action="up" className="rate-up" onClick={upvote}></div>
       <div className="points">{resource.votes_count}</div>
       <i className="flag outline icon" ></i>
     </div>
   );
};

CommentVotes.propTypes = {
  resource: PropTypes.object,
  upvote: PropTypes.func
};

export default CommentVotes;
