import React from 'react';
import SidebarPusher from './layouts/SidebarPusher.react';
import AuthStore from '../stores/AuthStore.js'

import TagModal from './partials/TagModal.react'
import FeedbackModal from './partials/FeedbackModal.react'

import '../../css/semantic.min.css';
import '../../css/prism.css';
import '../../css/main.scss';
import '../../css/custom.scss';

class Zhishi extends React.Component {
  constructor(props, context){
    super(props);
    this.state = { currentUser: AuthStore.getCurrentUser() };
  }


  render(){
    const { currentUser } = this.state;
    return (
      <div>
        <div id="zhishi-body" className="md-effect-12 full-height">
          <SidebarPusher />
          <div className="pusher">
            {this.props.children && React.cloneElement(this.props.children, {
              app_state: this.state
            })}

            <FeedbackModal options={{
                modalId: "selectFeedbackModal",
                autoShow: false,
                closable: true
            }} />

            <TagModal options={{
                  modalId: "selectTagModal",
                  autoShow: ($.isEmptyObject(currentUser.tags) ? true: false ),
                  closable: false
              }} />
          </div>
        </div>
        <div className="md-overlay"></div>
      </div>
    )
  }
}

module.exports = Zhishi;
