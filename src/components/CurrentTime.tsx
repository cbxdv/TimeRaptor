import React, { useState, useEffect } from 'react';

import { getCurrentDate, getCurrentDay } from '../utils/timeUtils';
import HeaderBubble from './HeaderBubble';

const getCurrentTime = () => new Date().toLocaleTimeString();

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState<string>(getCurrentTime());
  const [currentDate, setCurrentDate] = useState<string>(getCurrentDate());
  const [currentDay, setCurrentDay] = useState<string>(getCurrentDay());

  let timer: NodeJS.Timer;
  useEffect(() => {
    timer = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (
      new Date().toLocaleTimeString() === '12:00:00 AM' ||
      new Date().toLocaleTimeString() === '00:00:00 AM'
    ) {
      setCurrentDate(getCurrentDate());
      setCurrentDay(getCurrentDay());

      // eslint-disable-next-line
      location.reload();
    }
  });

  return (
    <HeaderBubble
      mainText={currentTime}
      secText={`${currentDate} - ${currentDay}`}
    />
  );
};

export default CurrentTime;
