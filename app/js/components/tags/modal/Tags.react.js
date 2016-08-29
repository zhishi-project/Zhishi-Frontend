import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars
import Tag from './Tag.react';

const getSelectedStatus = (selectedTags, tag) => {
  return (selectedTags.indexOf(tag.name) === -1) ?
    '' : 'selected';
};
function getViewTags(tags, selectedTags,
              TagThumbnails, onTagClick) {
  let viewTags = [];
  let index = 0;
  let selectedStatus;
  let keys = Object.keys(tags);
  for (let i = 0; i < keys.length; i++) {
    selectedStatus = getSelectedStatus(selectedTags, tags[keys[i]]);
    index = (index >= TagThumbnails.length - 1) ? 0 : index + 1;
    viewTags.push(
      <Tag
        key={i}
        tag={tags[keys[i]] }
        index={index + 1}
        TagThumbnails={TagThumbnails}
        selectedStatus={selectedStatus}
        onTagClick={onTagClick} />
    );
  }
  return viewTags;
}

const Tags = ({tags, selectedTags, TagThumbnails, onTagClick}) => {
  return (
     <div className="main content">
       <div className="ui grid container">
        {tags && getViewTags(tags, selectedTags, TagThumbnails, onTagClick)}
       </div>
     </div>
   );
};

Tags.propTypes = {
  tags: PropTypes.object,
  selectedTags: PropTypes.array,
  TagThumbnails: PropTypes.array,
  onTagClick: PropTypes.func
};

export default Tags;
