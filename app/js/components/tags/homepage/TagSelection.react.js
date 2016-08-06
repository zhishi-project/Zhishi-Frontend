import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars

const TagSelection = ({tag, onTagSelect}) => {
  return (
      <div className="field">
        <div className="ui checkbox">
          <input type="checkbox"
            value={tag.id}
            onClick={onTagSelect}/>
          <label>{tag.name}</label>
        </div>
    </div>
  );
};

TagSelection.propTypes = {
  tag: PropTypes.object,
  onTagSelect: PropTypes.func
};

export default TagSelection;
