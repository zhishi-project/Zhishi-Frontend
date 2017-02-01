import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars
import {Link} from 'react-router';

const MetaMobileOnly = ({username, userPermalink}) => {
  return (
     <p className="ui tablet only mobile only grid mobile-meta">
       asked by &nbsp;
       <Link to={`/users/${userPermalink}`}>{username}</Link>
     </p>
   );
};

MetaMobileOnly.propTypes = {
  username: PropTypes.string,
  userPermalink: PropTypes.string
};

export default MetaMobileOnly;
