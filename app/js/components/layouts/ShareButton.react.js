import React from 'react'

class SharePopup extends React.Component {
  constructor(props, context){
    super(props)

   }

   componentDidMount(){
     $(".share-popup").popup();
     new Clipboard('.share-popup');
     $(".share-popup").click(function(){
       window.getSelection().removeAllRanges();
     })
   }

   render () {
     let dom_id = this.props.dom_id;
     let text_to_copy = this.props.text_to_copy;
     let custom_class = this.props.custom_class;
     let type = this.props.type;
     let share_statement = `<div class="copy">Click to copy a link to this ${type} directly to your clipboard: <span id="copy-${dom_id}">${text_to_copy}</span></div>`;
     return (
       <a className={`${custom_class} share-popup`} data-html={share_statement} data-variation="very wide" data-clipboard-target={`#copy-${dom_id}`}>
        share
       </a>
     )
   }
 }

 export default SharePopup
