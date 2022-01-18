import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { fetchAllTimeBlocks } from '../actions/timeBlocksActions.js';

const initialState = {
  dayData: {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  },
  isLoading: true,
  nextBlock: {},
  currentBlock: {},
};

const TimeBlocksContext = createContext();

const timeBlocksReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'fetch/timeblocks/started':
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case 'fetch/timeblocks/success':
      return {
        ...state,
        isLoading: false,
        dayData: action.payload,
      };
    case 'fetch/timeblocks/failed':
      return {
        ...state,
        isLoading: false,
        error: 'Error fetching data',
      };
    case 'update/timeblocks':
      return {
        ...state,
        dayData: action.payload,
      };
    case 'update/currentblocks':
      return {
        ...state,
        currentBlock: { ...action.payload.currentBlock },
        nextBlock: { ...action.payload.nextBlock },
      };
    default:
      throw 'invalid action';
  }
};

export const TimeBlocksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(timeBlocksReducer, initialState);
  const value = { state, dispatch };

  const initTimeBlocks = async () => {
    dispatch({ type: 'fetch/timeblocks/started' });
    try {
      const data = (await fetchAllTimeBlocks()) || initialState.dayData;
      dispatch({ type: 'fetch/timeblocks/success', payload: data });
    } catch (error) {
      dispatch({ type: 'fetch/timeblocks/failed' });
    }
  };

  useEffect(() => {
    initTimeBlocks();
  }, []);

  return (
    <TimeBlocksContext.Provider value={value}>
      {children}
    </TimeBlocksContext.Provider>
  );
};

export const useTimeBlocks = () => {
  const context = useContext(TimeBlocksContext);
  if (!context) {
    throw new Error('useTimeBlocks must be used within a TimeBlocksProvider');
  }
  return context;
};
