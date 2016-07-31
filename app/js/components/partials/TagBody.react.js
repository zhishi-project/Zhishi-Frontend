import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars
import Tag from './Tag.react';

function getViewTags(tags, selectedTags, onTagClick) {
  let viewTags;
  let selectedStatus;
  let keys = Object.keys(tags);
  for (let i = 0; i < keys.length; i++) {
    selectedStatus = (selectedTags.indexOf(tags[keys[i]].name) === -1) ?
      '' : 'selected';
    viewTags.push(
      <Tag
        key={i}
        tag={tags[keys[i]] }
        selectedStatus={selectedStatus}
        onTagClick={onTagClick}
      />
    );
  }
  return viewTags;
}

function getSelectionCountDown(numberSelected, validCount, persistSelection) {
  return numberSelected < validCount ?
    `Select ${validCount - numberSelected} more categories` :
    <a href="#" className="md-close" onClick={persistSelection}>
      Continue
    </a>;
}

const TagBody = ({tags, selectedTags, options, onTagClick, persistSelection}) => {
  let validCount = 3;
  let numberSelected = selectedTags.length;
  let selectionValid = numberSelected >= validCount ? 'valid' : '';

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
         <div className="main content">
           <div className="ui grid container">
            {tags && getViewTags(tags, selectedTags, onTagClick)}
           </div>
         </div>

         <div className={`actions ${selectionValid}`}>
           {getSelectionCountDown(numberSelected, validCount, persistSelection)}
         </div>
         <a className={`${options.modalId}-trigger hidden`} />
       </div>
     </div>
  );
};

TagBody.propTypes = {
  viewTags: PropTypes.object,
  selectionCountDown: PropTypes.object,
  options: PropTypes.object
};

export default TagBody;
