import React from 'react'
import VoteActions from '../../actions/VoteActions.js'
import webAPI from '../../utils/webAPI.js'


class Votes extends React.Component {
  constructor(props, context){
    super(props)
   }

   vote(event){
     let action = $(event.target).data('action');
     let value = action == 'up' ? 1 : -1
     let { resource_name, resource, meta, callback } = this.props;
     webAPI.processRequest(`/${resource_name}s/${resource.id}/${action}vote`, 'POST', "", function(data){
       if (!data._error) {
         var votes_data = {id: resource.id, votes_count: data, meta, value}
         callback(votes_data)
       }
     })
   }

   render () {
     let { resource } = this.props;
     let upvoted = resource.user_vote && resource.user_vote == 1 ? 'active' : ''
     let downvoted = resource.user_vote && resource.user_vote == -1 ? 'active' : ''
     return (
       <div className="two wide column">
         <div data-action="up" className={`rate-up ${upvoted}`} onClick={this.vote.bind(this)}></div>
         <div className="rate-count">{resource.votes_count || 0}</div>
         <div data-action="down" className={`rate-down ${downvoted}`} onClick={this.vote.bind(this)}></div>
       </div>
     )
   }
 }

export default Votes;
