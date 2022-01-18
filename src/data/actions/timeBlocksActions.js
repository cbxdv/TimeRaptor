import { nanoid } from 'nanoid';

import { getElectronContext } from '../ElectronContext.js';
import { insertBlock } from '../../utils/timeBlockUtils.js';
import { getCurrentTimeAndDay } from '../../utils/timeUtils.js';

export const fetchAllTimeBlocks = () => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const electronContext = getElectronContext();
        const data = await electronContext.getAllTimeBlocks();
        resolve(data);
      } catch {
        reject();
      }
    });
  }, 1000);
};

export const updateTimeBlocks = (data) => {
  try {
    const electronContext = getElectronContext();
    electronContext.updateTimeBlocks(data);
  } catch (error) {
    console.log(error);
  }
};

export const insertNewTimeBlock = ({ timeBlock, state, dispatch }) => {
  let { title, startTime, endTime, day, blockColor, description } = timeBlock;

  if (title.length === 0) {
    return false;
  }
  const data = { title, startTime, endTime, day, blockColor, description };
  let dayData;
  try {
    dayData = insertBlock(state, data);
  } catch {
    return false;
  }
  dispatch({
    type: 'update/timeblocks',
    payload: dayData,
  });
  updateTimeBlocks(dayData);
  return true;
};

export const deleteTimeBlock = ({ timeblock, state, dispatch }) => {
  let { id, day } = timeblock;

  // Extracting the particular data
  let particularDay = state.dayData[day];

  // Filterintg with id
  particularDay = particularDay.filter((tb) => {
    if (tb.id !== id) {
      return tb;
    }
  });

  // Creating the dayData with filtered day
  let dayData = { ...state.dayData };
  dayData[day] = particularDay;

  // Updating data
  dispatch({
    type: 'update/timeblocks',
    payload: dayData,
  });

  updateTimeBlocks(dayData);
};

export const editTimeBlock = ({
  currentBlock,
  newTimeBlock,
  state,
  dispatch,
}) => {
  let { id } = currentBlock;
  let oldDay = currentBlock.day;
  let { title, startTime, endTime, blockColor, description } = newTimeBlock;
  let newDay = newTimeBlock.day;

  // Extracting the particular data
  let particularDay = state.dayData[oldDay];

  // Filterintg with id
  particularDay = particularDay.filter((tb) => {
    if (tb.id !== id) {
      return tb;
    }
  });

  // Creating the dayData with filtered day
  let dayData = { ...state.dayData };
  dayData[oldDay] = particularDay;

  state = { ...state, dayData };

  // Inserting the new block with same id
  const data = {
    id,
    title,
    startTime,
    endTime,
    day: newDay,
    blockColor,
    description,
  };
  dayData = insertBlock(state, data, false);

  // Updating data
  dispatch({
    type: 'update/timeblocks',
    payload: dayData,
  });

  updateTimeBlocks(dayData);

  return true;
};
