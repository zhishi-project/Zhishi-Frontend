import React from 'react'
import VoteActions from '../../actions/VoteActions.js'
import webAPI from '../../utils/webAPI.js'


class CommentVotes extends React.Component {
  constructor(props, context){
    super(props)
   }

   vote(event){
     var action = $(event.target).data('action');
     var props = this.props;
     webAPI.processRequest(`/comments/${props.resource.id}/${action}vote`, 'POST', "", (data) => {
       var votes_data = {id: props.resource.id, votes_count: data, meta: props.meta}
       props.callback(votes_data)
     })
   }

   render () {
     var votes_count = this.props.resource.votes_count > 0 ? this.props.resource.votes_count : "";
     return (
       <div className="points-holder">
         <div data-action="up" className="rate-up" onClick={this.vote.bind(this)}></div>
         <div className="points">{votes_count}</div>
         <i className="flag outline icon" ></i>
       </div>
     )
   }
 }

export default CommentVotes;
