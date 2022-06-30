import { configureStore } from '@reduxjs/toolkit'

import appReducer from './slices/appSlice'
import configsReducer from './slices/configsSlice'
import timetableReducer from './slices/timetableSlice'
import todosReducer from './slices/todosSlice'
import dayPlannerReducer from './slices/dayPlannerSlice'
import waterTrackerReducer from './slices/waterTrackerSlice'

export default configureStore({
  reducer: {
    app: appReducer,
    configs: configsReducer,
    timetable: timetableReducer,
    todos: todosReducer,
    dayPlanner: dayPlannerReducer,
    waterTracker: waterTrackerReducer
  },
  devTools: true
})
