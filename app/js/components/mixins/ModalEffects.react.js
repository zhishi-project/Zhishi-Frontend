import React from 'react'

let ModalEffects = InnerComponent => class extends React.Component {

   toggleModalShow(trigger) {
     $("."+trigger).click();
   }

   mountAsModal(modal, trigger, settings={}) {
     var app_body = document.querySelector("#zhishi-body");

     function removeModal () {
        $(modal).removeClass('md-show' );
        $(app_body).removeClass('md-show' );
     }

     $("."+trigger).on( 'click', function( ev ) {
       $(app_body).addClass('md-show');
       $(modal).addClass('md-show');
       if (settings.closable) {
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
