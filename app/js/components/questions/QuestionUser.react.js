import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars

const questionDate = question => {
  return question ?
    new Date(question.created_at).toDateString() :
    '(no date )';
};

const QuestionUser = ({question}) => {
  let user = question.user ? question.user : {};
  let userPermalink = Common.createPermalink(user.id, user.name);

  return (
     <div className="user-metadata clearfix">
       <p className="time-ago">
       Asked {questionDate(question)}
       </p>

       <div className="two equal width ui grid">
         <div className="fourteen wide column">
           <p className="user-fullname username">
             <Link to={`/users/${userPermalink}`}>
               {user.name || 'No name yet'}
             </Link>
             <span className="badges">
               {user.points || 0}
             </span>
           </p>
         </div>

         <div className="two wide column">
           <img
             src={user.image || '/assets/img/avatar.png'}
             alt="profile-image"
             className="profile-img" />
         </div>
       </div>
     </div>
   );
};

QuestionUser.propTypes = {
  question: PropTypes.object
};

export default QuestionUser;
