import React from 'react';
const TagSelection = (props) => {

  return (
      <div className="field">
        <div className="ui checkbox">
          <input type="checkbox" value={props.tag.id} onClick={props.onTagSelect}/>
          <label>{props.tag.name}</label>
        </div>
    </div>
    )
}
export default TagSelection;