import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars

/**
* @param {Object} numberSelected: from root reducer
* @param {Object} validCount: for functions
* @param {Object} persistSelection: for functions
* @return {Object}  {questions, filteredQuestions, page} for homepage
*/
function getSelectionCountDown(numberSelected, validCount, persistSelection) {
  return numberSelected < validCount ?
    `Select ${validCount - numberSelected} more categories` :
    <a href="#" className="md-close" onClick={persistSelection}>
      Continue
    </a>;
}

const TagSelectionCountdown = ({selectedTags, persistSelection}) => {
  let validCount = 3;
  let numberSelected = selectedTags.length;
  let selectionValid = numberSelected >= validCount ?
    'valid' : '';
  return (
     <div className={`actions ${selectionValid}`}>
       {getSelectionCountDown(numberSelected, validCount, persistSelection)}
     </div>
   );
};

TagSelectionCountdown.propTypes = {
  selectedTags: PropTypes.array,
  persistSelection: PropTypes.func
};

export default TagSelectionCountdown;
