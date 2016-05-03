import React from 'react'
import _ from 'jquery'

class Tag extends React.Component{
  render(){
    return <span>{this.props.tag}</span>
  }
}

class Tags extends React.Component {
  constructor(props, context){
    super(props)
   }

   render () {
     const { tags } = this.props;
     let tags_array = [];
     if (!_.isEmptyObject(tags)) {
       for(var i = 0; i < tags.length; i++) {
         tags_array.push(<Tag key={i} tag={tags[i]} />)
       }
     }
     return (
       <div class="tags">{tags_array}</div>
     )
   }
 }
export default Tags;
