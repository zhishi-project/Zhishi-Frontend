import React from 'react'
import VoteActions from '../../actions/VoteActions.js'
import webAPI from '../../utils/webAPI.js'


class Votes extends React.Component {
  constructor(props, context){
    super(props)
   }

   vote(event){
     var action = $(event.target).data('action');
     var props = this.props;
     webAPI.processRequest(`/${this.props.resource_name}s/${this.props.resource.id}/${action}vote`, 'POST', "", (data) => {
       var votes_data = {id: props.resource.id, votes_count: data.data, meta: props.meta}
       props.callback(votes_data)
     })
   }

   render () {
     return (
       <div className="two wide column">
         <div data-action="up" className="rate-up" onClick={this.vote.bind(this)}></div>
         <div className="rate-count">{this.props.resource.votes_count || 0}</div>
         <div data-action="down" className="rate-down" onClick={this.vote.bind(this)}></div>
       </div>
     )
   }
 }

export default Votes;
