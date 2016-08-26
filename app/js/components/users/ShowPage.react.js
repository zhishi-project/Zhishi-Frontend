import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars
import ProfileTagSection from './ProfileTag.react';
import Activities from '../activities/index.react';
import TagModal from '../tags/modal/TagModal.react';

const ShowPage = ({currentUser, user, activities}) => {
  let modalId = 'selectTagModal';
  let tags = currentUser.id === user.id ?
    currentUser.tags : user.tags;
  return (
     <div className="main-wrapper">
       <main className="ui container main">
         <div className="ui stackable user-details grid">

           <div className="five wide column">
             <div className="ui card user">

               <div className="image">
                 <img
                   src={user.image || '/assets/img/avatar.png'}
                   alt="Profile" />
               </div>

               <div className="content">
                 <span className="right floated">
                   <i className="heart outline like icon"></i>
                   Member since 2016
                 </span>
                 Reputation: {user.points}
               </div>

               <div className="extra content">
                 <a>
                   Asked {user.questions_asked} questions.&nbsp;
                   Gave {user.answers_given} answers
                 </a>
               </div>

             </div>
           </div>

           <div className="seven wide column">
             <h2>
               {user.name}
             </h2>
             <ProfileTagSection
               tags={tags || []}
               { ...{user, currentUser}}
               modalTrigger={`${modalId}-trigger`} />
           </div>
         </div>

         <Activities { ...{user, currentUser}} activities={activities} />

         {<TagModal options={{modalId, closable: true}} />}

       </main>

     </div>
   );
};

ShowPage.propTypes = {
  currentUser: PropTypes.object,
  user: PropTypes.object,
  activities: PropTypes.array
};

export default ShowPage;
