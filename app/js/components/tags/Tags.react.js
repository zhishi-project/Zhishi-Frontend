import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars

const Tag = ({tag}) => {
  return <span>{tag.name}</span>;
};

const Tags = ({tags}) => {
  let tagsArray = [];
  if (tags && !Object.is({}, tags)) {
    for (var i = 0; i < tags.length; i++) {
      tagsArray.push(<Tag key={i} tag={tags[i]} />);
    }
  }
  return (
    <div className="tags">{tagsArray}</div>
  );
};

Tag.propType = {
  tags: PropTypes.object
};

export default Tags;
