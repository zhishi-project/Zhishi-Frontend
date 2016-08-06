import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars
import VotesInfoBanner from './VotesInfoBanner.react';

const Votes = ({resource, voteInfoToDisplay, upvote,
                upvoted, downvote, downvoted, onCloseMessage}) => {
  return (
     <div className="two wide column">
       <VotesInfoBanner
         voteInfoToDisplay={voteInfoToDisplay}
         onCloseMessage={onCloseMessage} />

       <div
         className={`rate-up ${upvoted()}`}
         onClick={upvote}>
       </div>

       <div
         className="rate-count">
         {resource.votes_count || 0}
       </div>

       <div
         className={`rate-down ${downvoted()}`}
         onClick={downvote}>
       </div>
     </div>
   );
};

Votes.propTypes = {
  resource: PropTypes.object,
  voteInfoToDisplay: PropTypes.string,
  upvote: PropTypes.func,
  downvote: PropTypes.func,
  upvoted: PropTypes.func,
  downvoted: PropTypes.func,
  onCloseMessage: PropTypes.func
};

export default Votes;
