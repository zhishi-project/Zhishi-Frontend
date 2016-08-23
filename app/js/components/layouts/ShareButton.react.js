import React from 'react';
import $ from 'jquery';

class SharePopup extends React.Component {
  constructor(props) {
    super(props);
  }

   componentDidMount() {
    //  $('.share-popup').popup();
    //  new Clipboard('.share-popup');
     $('.share-popup').click(function() {
       window.getSelection().removeAllRanges();
     });
   }

   render() {
     let domId = this.props.dom_id;
     let textToCopy = this.props.textToCopy;
     let customClass = this.props.custom_class;
     let type = this.props.type;
     let share_statement = `<div class="copy">Click to copy a link to this ${type} directly to your clipboard: <span id="copy-${domId}">${textToCopy}</span></div>`;
     return (
       <a className={`${customClass} share-popup`} data-html={share_statement} data-variation="very wide" data-clipboard-target={`#copy-${domId}`}>
        share
       </a>
     );
   }
 }

export default SharePopup;
