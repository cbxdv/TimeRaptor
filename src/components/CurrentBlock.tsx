import React from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentBlock } from '../redux/slices/timetableSlice';
import HeaderBubble from './HeaderBubble';

const CurrentBlock = () => {
  const currentBlock = useSelector(selectCurrentBlock);

  let mainText = '';
  let secText = '';

  if (currentBlock && currentBlock.id) {
    mainText = currentBlock.title;
    const { hours } = currentBlock.timeLeft;
    let { minutes } = currentBlock.timeLeft;
    if (minutes === 0) {
      minutes = 1;
    }
    if (hours > 0) {
      secText += `${hours * 60 + minutes} mintues`;
    } else if (minutes > 0) {
      secText += `${minutes} minutes`;
    }
    secText += ` remaining`;
  }

  if (mainText.length !== 0) {
    return <HeaderBubble mainText={mainText} secText={secText} />;
  }
  return <div />;
};

export default React.memo(CurrentBlock);
