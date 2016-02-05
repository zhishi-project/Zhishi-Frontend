import React from 'react'

class Tag extends React.Component {
  constructor(props, context){
    super(props)
   }

   render () {
     return (
       <span>
         {this.props.tag}
       </span>
     )
   }
 }

class Tags extends React.Component {
  constructor(props, context){
    super(props)
   }

   render () {
     var tags = [];
     if (!$.isEmptyObject(this.props.tags)) {
       for(var i = 0; i < this.props.tags.length; i++) {
         tags.push(<Tag key={i} tag={this.props.tags[i]} />)
       }
     }
     return (
       <div>{tags}</div>
     )
   }
 }
module.exports = Tags
