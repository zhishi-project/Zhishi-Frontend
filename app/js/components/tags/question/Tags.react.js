import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars

const Tags = ({tags}) => {
  let tagsArray = [];
  if (tags && !Object.is({}, tags)) {
    let keys = Object.keys(tags);
    for (var i = 0; i < keys.length; i++) {
      tagsArray.push(<span key={i}>
                        {tags[keys[i]].name}
                      </span>);
    }
  }
  return (
    <div className="tags">{tagsArray}</div>
  );
};

Tags.propType = {
  tags: PropTypes.object
};

export default Tags;
