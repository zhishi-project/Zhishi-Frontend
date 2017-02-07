import React from 'react';
import Header from './layouts/Header.react';
import Footer from './layouts/Footer.react';
import SidebarPusher from './layouts/SidebarPusher.react';
import store from '../stores/QuestionStore'

import Auth from '../auth';

import TagModal from './tags/modal/TagModal.react';
import FeedbackModal from './partials/FeedbackModal.react';

import '../../css/semantic.min.css';
import '../../css/toastr.css';
import '../../css/prism.css';
import '../../css/tags.scss';
import '../../css/main.scss';
import '../../css/custom.scss';
import '../../css/error-page.css'


class Zhishi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentUser: Auth.getCurrentUser()};
  }

  render() {
    const {currentUser} = this.state;
    return (
      <div>
        <div id="zhishi-body" className="md-effect-12 full-height">
          <Header />
          <SidebarPusher />
          <div className="pusher">
            {this.props.children && React.cloneElement(this.props.children, {
              state: this.state
            })}

            <FeedbackModal options={{
              modalId: 'selectFeedbackModal',
              autoShow: false,
              closable: true
            }} />

            <TagModal options={{
              modalId: 'selectTagModal',
              autoShow: ($.isEmptyObject(currentUser.tags) ? true : false ),
              closable: false
            }} />
          </div>
          <Footer />
        </div>
        <div className="md-overlay"></div>
      </div>
    );
  }
}

export default Zhishi;
