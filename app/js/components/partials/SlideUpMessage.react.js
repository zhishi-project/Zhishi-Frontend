import React from 'react'
import SlideUpEffect from '../mixins/SlideUpEffect.react'

import _ from 'jquery'

const SlideUpMessage = ({ toggleMessage, options, currentUser }) => {
   return options.message
}

 export default SlideUpEffect(SlideUpMessage);
