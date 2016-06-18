import React from 'react'
import VoteActions from '../../actions/VoteActions.js'
import webAPI from '../../utils/webAPI.js'
import AuthStore from '../../stores/AuthStore.js'
import SlideUpMessage from "../partials/SlideUpMessage.react"

let voteState = (shouldDisplay) => {
  return {
    shouldDisplayCannotVoteInfo: shouldDisplay,
    currentUser: AuthStore.getCurrentUser()
  }
}

class Votes extends React.Component {
  constructor(props, context){
    super(props)
    this.vote = this.vote.bind(this)
    this.shouldVote = this.shouldVote.bind(this);
    this.onCloseMessage = this.onCloseMessage.bind(this);
    this.state = voteState(false)
  }

   shouldVote(event){
     const { currentUser } = this.state;
     if (currentUser.points > 14) return this.vote(event);
     return this.setState({shouldDisplayCannotVoteInfo: true})
   }

   onCloseMessage(){
     return this.setState({shouldDisplayCannotVoteInfo: false})
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

   renderMessage() {
     const { currentUser, shouldDisplayCannotVoteInfo } = this.state;
     return shouldDisplayCannotVoteInfo
      ? <SlideUpMessage
          options={{display: 'show' }}
          onCloseMessage={this.onCloseMessage}
          currentUser={currentUser}
        />
      : ''
   }

   render () {
     let { resource } = this.props;
     let upvoted = resource.user_vote && resource.user_vote == 1 ? 'active' : ''
     let downvoted = resource.user_vote && resource.user_vote == -1 ? 'active' : ''
     return (
       <div className="two wide column">
         { this.renderMessage() }
         <div data-action="up" className={`rate-up ${upvoted}`} onClick={this.shouldVote}></div>
         <div className="rate-count">{resource.votes_count || 0}</div>
         <div data-action="down" className={`rate-down ${downvoted}`} onClick={this.shouldVote}></div>
       </div>
     )
   }
 }

export default Votes;
