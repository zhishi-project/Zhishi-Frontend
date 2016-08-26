import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars

const Tag = ({tag, index, TagThumbnails, selectedStatus, onTagClick}) => {
  index = (index >= TagThumbnails.length - 1) ? 0 : index + 1;
  return (
    <div className={`tag ${selectedStatus}`}
        onClick={onTagClick.bind(this, tag)} >
      <div className="overlay">
        <i className="heart icon" data-tag-id={tag.id} />
      </div>
      <img src={`/assets/img/tags/${TagThumbnails[index]}.jpg`} />
      <p className="desc">
        {tag.name}
      </p>
    </div>
  );
};

Tag.propTypes = {
  tag: PropTypes.object.isRequired,
  index: PropTypes.number,
  options: PropTypes.array,
  selectedStatus: PropTypes.string,
  onTagClick: PropTypes.func.isRequired
};

export default Tag;
