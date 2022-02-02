import { configureStore } from '@reduxjs/toolkit';

import timetableReducer from './slices/timetableSlice';
import userConfigsReducer from './slices/userConfigsSlice';

export default configureStore({
  reducer: {
    userConfigs: userConfigsReducer,
    timetable: timetableReducer
  }
});
