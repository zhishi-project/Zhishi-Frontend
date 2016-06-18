import React from 'react'
import SlideUpEffect from '../mixins/SlideUpEffect.react'

import _ from 'jquery'

const SlideUpMessage = ({ toggleMessage, options, currentUser }) => {
  let pointsLeft = 15 - currentUser.points;
   return (
       <div>
         <div className="header">
           Uh oh. . You need just {pointsLeft} more points! <br />
         </div>
         <p>Seems you don't yet have up to 15 points yet. You could win some by</p>
         <ul className="list">
           <li>Asking questions others could find helpful.</li>
           <li>Contributing answers and comments others will bless you for.</li>
         </ul>
     </div>
   )
 }

 export default SlideUpEffect(SlideUpMessage);
