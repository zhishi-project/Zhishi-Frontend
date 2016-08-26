import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars
import QuestionTags from './QuestionTags.react';

const MetaComputerOnly = ({
  question,
  username,
  userPermalink
}) => {
  var userAvatar = question.user ? question.user.image : '';
  var questionDate = new Date(question.created_at);
  return (
     <div className="equal width ui computer only grid metadata">

       <div className="eight wide column">
         <QuestionTags question={question} />
       </div>

       <div className="three wide column">
         <p>Asked on {questionDate.toDateString() || '(no date )'}</p>
       </div>

       <div className="five wide column">
         <a href={`/users/${userPermalink}`}
           className="username"
           title={username}>
           {username}
         </a>

         <img
           src={userAvatar || '/assets/img/avatar.png'} alt="profile-image"
           className={"thumb"} />

       </div>

     </div>
   );
};

MetaComputerOnly.propTypes = {
  question: PropTypes.object,
  username: PropTypes.string,
  userPermalink: PropTypes.string
};

export default MetaComputerOnly;
