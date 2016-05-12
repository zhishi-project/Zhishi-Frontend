import React from 'react'
import $ from 'jquery'

const Tag = ({ tag }) => {
  return <span>{tag.name}</span>
}

const Tags = ({ tags }) => {
   let tags_array = [];
   if (!$.isEmptyObject(tags)) {
     for(var i = 0; i < tags.length; i++) {
       tags_array.push(<Tag key={i} tag={tags[i]} />)
     }
   }
   return (
     <div className="tags">{tags_array}</div>
   )
 }
export default Tags;
