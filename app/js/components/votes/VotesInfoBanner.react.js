import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars
import SlideUpMessage from '../partials/SlideUpMessage.react';
import ServerError from './flash/ServerError.react';
import InsufficientPoints from './flash/InsufficientPoints.react';
import DoubleVoting from './flash/DoubleVoting.react';

const messageElement = voteInfoToDisplay => {
  switch (voteInfoToDisplay) {
    case 'error':
      return <ServerError />;
    case 'equalValue':
      return <DoubleVoting />;
    case 'lackingPoints':
      return <InsufficientPoints />;
    default:
      return null;
  }
};

const VotesInfoBanner = ({voteInfoToDisplay, onCloseMessage}) => {
  let message = messageElement(voteInfoToDisplay);
  return message ?
    <SlideUpMessage
      options={{display: 'show', message}}
      onCloseMessage={onCloseMessage} /> : <div />;
};

VotesInfoBanner.propTypes = {
  voteInfoToDisplay: PropTypes.string,
  onCloseMessage: PropTypes.func.isRequired
};

export default VotesInfoBanner;
