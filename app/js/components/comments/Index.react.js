import React from 'react'
import CommentShow from './Show.react'
import NewComment from './New.react'
import CommentStore from '../../stores/CommentStore.js'
import CommentActions from '../../actions/CommentActions.js'
import webAPI from '../../utils/webAPI.js'
import Common from "../../utils/Common"


 function getCommentsState(meta){
   var comments = CommentStore.getComments(meta.resource_name, meta.resource_id)
   if (comments) {
     return { comments: comments }
   } else {
     if (meta.resource_id) {
      //  webAPI.processRequest(`/${meta.resource_name}/${meta.resource_id}/comments`, 'GET', "", (data) => {
      //    CommentActions.receiveComments({meta: meta, comments: data})
      //  })
     }
     return {}
   }
 }

class AllComments extends React.Component {
  constructor(props, context){
    super(props)
    this.state = getCommentsState(props.meta)
   }

   componentDidMount(){
     CommentStore.addChangeListener(this._onChange.bind(this));
   }
   componentWillUnmount(){
     CommentStore.removeChangeListener(this._onChange).bind(this);
   }
   _onChange() {
     this.setState(getCommentsState(this.props.meta))
   }

   render () {
     var comments = [], keys=[];
     var meta = this.props.meta;
     if (this.state.comments) {
       keys = Object.keys(this.state.comments)
       for (var i = 0; i < keys.length; i++) {
         comments.push(<CommentShow key={i} meta={meta} comment={this.state.comments[keys[i]]} />)
       }
     }
    //  else if (!this.state.comments) {
    //     comments.push(<i key={0} className="notched circle loading icon"></i>)
    //  }
     return (
       <div className="ui minimal comments">
         <div className="ui dividing header"></div>
         {comments}

         <NewComment meta={meta} />
       </div>
     )
   }
 }
 module.exports = AllComments;
