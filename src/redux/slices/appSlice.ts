/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchBlocks } from './timetableSlice'

import { IAppState, IState } from '../../@types/StateInterfaces'
import { getCurrentDayString } from '../../utils/timeUtils'
import {
  fetchTimetableData,
  getElectronContext
} from '../../utils/electronUtils'
import { generateTimetableTimeStamps } from '../../utils/notificationUtils'
import { ITimeStamp } from '../../@types/AppInterfaces'
import {
  startNotificationsService,
  stopNotificationService
} from '../../utils/notificationService'
import { NotificationStartPayloadAction } from '../../@types/TimeBlockInterfaces'

const initialState: IAppState = {
  timeStamps: [],
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
  async (notificationStates?: NotificationStartPayloadAction) => {
    let stamps: ITimeStamp[] = []
    const response = await fetchTimetableData()
    const day = getCurrentDayString()
    const dayData = response[day]
    stamps = generateTimetableTimeStamps(dayData, stamps)

    if (
      notificationStates.startNotifications &&
      notificationStates.endNotifications
    ) {
      stopNotificationService()
      startNotificationsService(stamps, notificationStates)
    }

    return stamps
  }
)

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    appLoadingStarted(state) {
      state.status = 'loading'
    },
    appLoadingStopped(state) {
      state.status = 'idle'
    },
    maximizedToggled(state) {
      state.maximized = !state.maximized
    },
    notificationServiceStarted(
      state,
      action: PayloadAction<NotificationStartPayloadAction>
    ) {
      state.isNotificationServiceRunning = true
      stopNotificationService()
      startNotificationsService(
        JSON.parse(JSON.stringify(state.timeStamps)),
        action.payload
      )
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
        const currentDay = getCurrentDayString()
        const dayData = action.payload[currentDay]
        const oldStamps = JSON.parse(JSON.stringify(state.timeStamps))
        state.timeStamps = generateTimetableTimeStamps(dayData, oldStamps)
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
  appLoadingStarted,
  appLoadingStopped,
  maximizedToggled,
  notificationServiceStarted,
  notificationServiceStopped
} = appSlice.actions

// Selectors
export const selectIsNotificationServiceRunning = (state: IState) =>
  state.app.isNotificationServiceRunning
export const selectTimeStamps = (state: IState) => state.app.timeStamps
export const selectPlatform = (state: IState) => state.app.platform
export const selectVersion = (state: IState) => state.app.appVersion
export const selectAppMaximized = (state: IState) => state.app.maximized
export const selectAppStatus = (state: IState) => state.app.status
