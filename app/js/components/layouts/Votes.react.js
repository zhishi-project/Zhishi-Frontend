import React from 'react'
import VoteActions from '../../actions/VoteActions.js'
import webAPI from '../../utils/webAPI.js'
import AuthStore from '../../stores/AuthStore.js'
import SlideUpMessage from "../partials/SlideUpMessage.react"

import ServerError from '../partials/flash/ServerError.react'
import InsufficientPoints from '../partials/flash/insufficientPoints.react'
import DoubleVoting from '../partials/flash/DoubleVoting.react'

let voteState = (shouldDisplay) => {
  return {
    VoteInfoToDisplay: shouldDisplay,
    currentUser: AuthStore.getCurrentUser()
  }
}

class Votes extends React.Component {
  constructor(props, context){
    super(props)
    this.vote = this.vote.bind(this)
    this.shouldVote = this.shouldVote.bind(this);
    this.message = this.message.bind(this);
    this.onCloseMessage = this.onCloseMessage.bind(this);
    this.state = voteState(false)
  }

   shouldVote(event){
     const { currentUser } = this.state;
     if (currentUser.points > 14) return this.vote(event);
     return this.setState({VoteInfoToDisplay: 'lackingPoints'})
   }

   onCloseMessage(){
     return this.setState({VoteInfoToDisplay: false})
   }

   vote(event){
     let action = $(event.target).data('action');
     let value = action == 'up' ? 1 : -1
     let { resource_name, resource, meta, callback } = this.props;
     let that = this;
     webAPI.processRequest(`/${resource_name}s/${resource.id}/${action}vote`, 'POST', "", function(data){
       if (data._error) {
         that.setState(voteState('error'))
       } else if (resource.votes_count == data.response) {
         that.setState(voteState('equalValue'))
       }
       else {
         var votes_data = {id: resource.id, votes_count: data, meta, value}
         callback(votes_data)
       }
     })
   }

   message(message) {
     return <SlideUpMessage
            options={{display: 'show', message: message }}
            onCloseMessage={this.onCloseMessage}
          />
   }

   renderMessage() {
     const { currentUser, VoteInfoToDisplay } = this.state;
     switch (VoteInfoToDisplay) {
       case 'error':
            return this.message(<ServerError />)
        case 'equalValue':
            return this.message(<DoubleVoting />)
        case 'lackingPoints':
            return this.message(<InsufficientPoints />)
        default:
          return ''
     }
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
