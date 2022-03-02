import { configureStore } from '@reduxjs/toolkit'

import appReducer from './slices/appSlice'
import configsReducer from './slices/configsSlice'
import timetableReducer from './slices/timetableSlice'

export default configureStore({
  reducer: {
    app: appReducer,
    configs: configsReducer,
    timetable: timetableReducer
  }
})
