import React from 'react';
import $ from 'jquery';

/*
  This is the SlideUpMessage component
  Okay, it's a pure, presentation component.
  To make a component a SlideUpMessage, just pass it in as an argument
*/

const SlideUpEffect = InnerComponent => class extends React.Component {
   constructor(props) {
     super(props);
     this.toggleMessage = this.toggleMessage.bind(this);
   }

   toggleMessage() {
     const {options, onCloseMessage} = this.props;
     $(this.refs.panel).removeClass(options.display);
     setTimeout(() => {
       onCloseMessage();
     }, 1000);
   }

   render() {
     const {display} = this.props.options;
     return (
        <div className={`slideMessagePanel ${display}`} ref="panel">
          <div className="ui info message">
            <i className="close icon" onClick={this.toggleMessage}></i>
              <InnerComponent
                toggleMessage={this.toggleMessage}
                {...this.state}
                {...this.props} />
            </div>
        </div>
      );
   }
};

export default SlideUpEffect;
