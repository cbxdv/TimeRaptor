import { configureStore } from '@reduxjs/toolkit'

import appReducer from './slices/appSlice'
import configsReducer from './slices/configsSlice'
import timetableReducer from './slices/timetableSlice'
import todosReducer from './slices/todosSlice'
import dayPlannerReducer from './slices/dayPlannerSlice'
import waterTrackerReducer from './slices/waterTrackerSlice'

const store = configureStore({
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

export default store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
