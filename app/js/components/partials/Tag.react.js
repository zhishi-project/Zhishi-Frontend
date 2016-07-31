import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars

const Tag = ({tag, index, options, selectedStatus, onTagClick}) => {
  index = (index >= options.length - 1) ? 0 : index + 1;
  return (
    <div className={`tag ${selectedStatus}`}
        onClick={onTagClick.bind(this, tag)} >
      <div className="overlay">
        <i className="heart icon" data-tag-id={tag.id} />
      </div>
      <img src={`/assets/img/tags/${options[index]}.jpg`} />
      <p className="desc">
        {tag.name}
      </p>
    </div>
  );
};

Tag.propTypes = {
  tag: PropTypes.object,
  index: PropTypes.number,
  options: PropTypes.object,
  selectedStatus: PropTypes.string
};

export default Tag;
