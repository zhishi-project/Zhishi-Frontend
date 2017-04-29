import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars
import {Link} from 'react-router';

const Title = ({title, permalink}) => {
  return (
     <p className="question-container">
       <Link
         to={`/questions/${permalink}` || '#'} className="question-link">
         {title || 'No title'}
       </Link>
     </p>
   );
};

Title.propTypes = {
  title: PropTypes.string,
  permalink: PropTypes.string
};

export default Title;
