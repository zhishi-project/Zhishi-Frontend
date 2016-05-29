import React from 'react'

/*
  Here's the ultimate modal creator :)
  Okay, it's a pure, presentation component.
  To make a component a modal, pass in the component as an argument to ModalEffects

  When mounting the modal, passing other options as a prop.
  These options include modalId, closable, autoshow
  modalId: the ID of the component you want to make a modal
  closable: Should the user be able to close the modal by clicking outside of it?
  autoShow: Should the modal slide in after 2 secs or would you rather trigger it with a button?

  To make an element show/hide a modal, add class 'modalId-trigger' to the element
  where modalId is the same as the Id assigned to the component.
  E.g., if modalId='myModal', then modal trigger element would have class 'myModal-trigger'
*/

const ModalEffects = InnerComponent => class extends React.Component {

   toggleModalShow(trigger) {
     $("."+trigger).click();
   }

   mountAsModal(options={}) {
     let app_body = document.querySelector("#zhishi-body");
     let modal = document.querySelector("#"+options.modalId)

     function removeModal () {
        $(modal).removeClass('md-show' );
        $(app_body).removeClass('md-show' );
     }

     $(`.${options.modalId}-trigger`).on( 'click', function( ev ) {
       $(app_body).addClass('md-show');
       $(modal).addClass('md-show');
       if (options.closable) {
         var overlay = document.querySelector( '.md-overlay' );
         overlay.removeEventListener( 'click', removeModal );
         overlay.addEventListener( 'click', removeModal );
       }
     });


     $(modal).on('click', '.md-close', function( ev ) {
       ev.preventDefault();
       removeModal();
     });

   }


   componentDidMount(){
     const { options } = this.props;
     this.mountAsModal(options);
     if (options.autoShow) {
       setTimeout( () => {
         this.toggleModalShow(`${options.modalId}-trigger`)
       }, 2000)
     }
   }
   render() {

      return <InnerComponent
                mountAsModal={this.mountAsModal}
                toggleModalShow={this.toggleModalShow}
                {...this.state}
                {...this.props}
              />
   }
};

export default ModalEffects
