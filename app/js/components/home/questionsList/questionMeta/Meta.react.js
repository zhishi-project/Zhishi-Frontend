import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars
import Common from '../../../../utils/Common.js';
import Title from './Title.react';
import MetaMobileOnly from './MetaMobileOnly.react';
import MetaComputerOnly from './MetaComputerOnly.react';

export function getUserPermalink({user}) {
  return user ?
  Common.createPermalink(user.id, user.name) :
  '#';
}

const Meta = ({question}) => {
  var username = question.user ? question.user.name : '';
  var permalink = Common.createPermalink(question.id, question.title);
  let userPermalink = getUserPermalink(question);
  return (
     <div>

       <Title
         title={question.title}
         permalink={permalink} />

       <MetaMobileOnly
         username={username}
         userPermalink={userPermalink} />

       <MetaComputerOnly
         question={question}
         username={username}
         userPermalink={userPermalink} />

     </div>
   );
};

Meta.propTypes = {
  question: PropTypes.object
};

export default Meta;
