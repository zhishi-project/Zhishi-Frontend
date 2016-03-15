import React from 'react'

class Footer extends React.Component {
  constructor(props, context){
    super(props)

   }

   render () {
     return (
       <footer className="footer">
         <div className="ui container">
           <div className="ui grid">
             <div className="left floated seven wide column">
               <img src="/assets/img/logo-footer.png" alt="zhishi-footer-logo" />
             </div>

             <div className="right floated four wide column">
               <p className="copyright">
                 &copy; Copyright 2016. All Rights Reserved.
               </p>
             </div>
           </div>
         </div>
       </footer>
     )
   }
 }

export default Footer;
