import React from 'react';
const TagSelection = (props) => {

  return (
      <div className="field">
        <div className="ui checkbox">
          <input type="checkbox" name={props.tag.name}/>
          <label>{props.tag.name}</label>
        </div>
    </div>
    )
}
export default TagSelection;