import React from 'react'; // eslint-disable-line no-unused-vars
import SlideUpEffect from '../mixins/SlideUpEffect.react';

const SlideUpMessage = ({options}) => {
  return options.message;
};

export default SlideUpEffect(SlideUpMessage);
