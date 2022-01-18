import { nanoid } from 'nanoid';
import { getElectronContext } from '../data/ElectronContext.js';
import { getDurationMinutes } from './timeUtils.js';

export const insertBlock = (state, data, newId = true) => {
  const duration = getDurationMinutes(data.startTime, data.endTime);
  if (duration <= 0) {
    throw 'invalid block';
  }
  data = {
    duration: getDurationMinutes(data.startTime, data.endTime),
    ...data,
  };
  if (newId) {
    data.id = nanoid();
  }
  const dayData = {
    ...state.dayData,
    [data.day]: [...state.dayData[data.day], data],
  };
  return dayData;
};

export const timeBlockNotification = (title, description) => {
  try {
    const electron = getElectronContext();
    electron.appNotify({
      title: `${title} starts Now`,
      body: `${description}`,
    });
  } catch (error) {
    console.log(error);
  }
};
