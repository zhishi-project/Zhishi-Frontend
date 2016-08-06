import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars
import Tags from './Tags.react';
import TagSelectionCountdown from './TagSelectionCountdown.react';

const TagBody = ({
  tags,
  selectedTags,
  options,
  onTagClick,
  persistSelection
}) => {
  return (
     <div id="selectTagModal" className="md-modal">
       <div className="modal-container">
         <div className="header">
           <h4>
             Choose categories that are important to you
           </h4>
           <p>
             So we can make your feed more . . . personal!
           </p>
         </div>
         <Tags {...{tags, selectedTags, options, onTagClick}} />

         <TagSelectionCountdown
           {...{selectedTags, persistSelection}}/>

         <a className={`${options.modalId}-trigger hidden`} />
       </div>
     </div>
  );
};

TagBody.propTypes = {
  tags: PropTypes.object,
  selectedTags: PropTypes.array,
  options: PropTypes.array,
  onTagClick: PropTypes.func,
  persistSelection: PropTypes.func
};

export default TagBody;
