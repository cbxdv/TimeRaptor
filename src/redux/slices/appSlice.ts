/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchBlocks } from './timetableSlice'

import { IAppState, IState } from '../../@types/StateInterfaces'
import { getCurrentDay } from '../../utils/timeUtils'
import {
  fetchTimetableData,
  getElectronContext
} from '../../utils/electronContext'
import { generateTTTimeStamps } from '../../utils/notificationUtils'
import { ITimeStamp } from '../../@types/AppInterfaces'
import {
  startNotificationService,
  stopNotificationService
} from '../../utils/notificationService'

const initialState: IAppState = {
  timeStamps: [],
  timetableCurrentBlock: null,
  platform: 'darwin',
  appVersion: '',
  maximized: false,
  isNotificationServiceRunning: false,
  status: 'loading',
  error: null
}

export const fetchAppProps = createAsyncThunk('app/fetch', async () => {
  const electronContext = getElectronContext()

  const appVersion = (await electronContext.getAppVersion()) || '2.0.0'
  const platform = (await electronContext.getPlatform()) || 'darwin'

  const data = {
    platform,
    appVersion
  }

  return data
})

export const updateTimeStamps = createAsyncThunk(
  'app/update',
  async (notificationState?: boolean) => {
    let stamps: ITimeStamp[] = []
    const response = await fetchTimetableData()
    const day = getCurrentDay()
    const dayData = response[day]
    stamps = generateTTTimeStamps(dayData, stamps)

    if (
      notificationState === null ||
      notificationState === undefined ||
      notificationState === true
    ) {
      stopNotificationService()
      startNotificationService(stamps)
    }

    return stamps
  }
)

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    currentTimetableBlockChanged(state, action) {
      state.timetableCurrentBlock = action.payload
    },
    appLoadingStarted(state) {
      state.status = 'loading'
    },
    appLoadingStopped(state) {
      state.status = 'idle'
    },
    maximizedToggled(state) {
      state.maximized = !state.maximized
    },
    notificationServiceToggled(
      state,
      action?: PayloadAction<{ restart: boolean }>
    ) {
      const restart = action.payload ? action.payload.restart : false
      state.isNotificationServiceRunning = !state.isNotificationServiceRunning
      if (state.isNotificationServiceRunning || restart) {
        stopNotificationService()
        startNotificationService(JSON.parse(JSON.stringify(state.timeStamps)))
      } else {
        stopNotificationService()
      }
    },
    notificationServiceStarted(state) {
      state.isNotificationServiceRunning = true
      stopNotificationService()
      startNotificationService(JSON.parse(JSON.stringify(state.timeStamps)))
    },
    notificationServiceStopped(state) {
      state.isNotificationServiceRunning = false
      stopNotificationService()
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAppProps.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchAppProps.fulfilled, (state, action) => {
        state.platform = action.payload.platform
        state.appVersion = action.payload.appVersion
        state.status = 'idle'
        state.error = null
      })
      .addCase(fetchAppProps.rejected, state => {
        state.status = 'error'
        state.error = 'Error initializing app. Try restarting app.'
      })
      .addCase(fetchBlocks.fulfilled, (state, action) => {
        const currentDay = getCurrentDay()
        const dayData = action.payload[currentDay]
        const oldStamps = JSON.parse(JSON.stringify(state.timeStamps))
        state.timeStamps = generateTTTimeStamps(dayData, oldStamps)
      })
      .addCase(updateTimeStamps.fulfilled, (state, action) => {
        state.timeStamps = action.payload
      })
      .addCase(updateTimeStamps.rejected, state => {
        state.status = 'error'
        state.error = 'Error updating Notification Service'
      })
  }
})

export default appSlice.reducer

export const {
  currentTimetableBlockChanged,
  appLoadingStarted,
  appLoadingStopped,
  maximizedToggled,
  notificationServiceToggled,
  notificationServiceStarted,
  notificationServiceStopped
} = appSlice.actions

// Selectors
export const selectIsNotificationServiceRunning = (state: IState) =>
  state.app.isNotificationServiceRunning
export const selectTimeStamps = (state: IState) => state.app.timeStamps
export const selectTTCurrentBlock = (state: IState) =>
  state.app.timetableCurrentBlock
export const selectPlatform = (state: IState) => state.app.platform
export const selectVersion = (state: IState) => state.app.appVersion
export const selectAppMaximized = (state: IState) => state.app.maximized
export const selectAppStatus = (state: IState) => state.app.status
