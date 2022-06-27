/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchBlocks } from './timetableSlice'

import { IAppState, IState } from '../../@types/StateInterfaces'
import { getCurrentDayString } from '../../utils/timeUtils'
import {
  fetchTimetableData,
  fetchTodosData,
  getElectronContext,
  fetchNotificationStates
} from '../../utils/electronUtils'
import {
  generateTimetableTimeStamps,
  generateTodoTimeStamps
} from '../../utils/notificationUtils'
import { ITimeStamp } from '../../@types/AppInterfaces'
import {
  startNotificationsService,
  stopNotificationService
} from '../../utils/notificationService'
import { fetchTodos } from './todosSlice'
import { fetchConfigs } from './configsSlice'

const initialState: IAppState = {
  timeStamps: [],
  platform: 'darwin',
  appVersion: '',
  maximized: false,
  isNotificationServiceRunning: false,
  notificationStates: {
    startTimetableNotifications: true,
    endTimetableNotifications: true,
    startTimetableNotificationsBefore: 0,
    endTimetableNotificationsBefore: 0,
    todoNotifications: true
  },
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

export const updateTimeStamps = createAsyncThunk('app/update', async () => {
  let stamps: ITimeStamp[] = []

  const notificationStates = await fetchNotificationStates()

  const response = await fetchTimetableData()
  const day = getCurrentDayString()
  const timetableDayData = response[day]
  stamps = generateTimetableTimeStamps(timetableDayData, stamps)

  const todosData = await fetchTodosData()
  stamps = generateTodoTimeStamps(todosData.todos, stamps)

  stopNotificationService()
  startNotificationsService(stamps, notificationStates)
  return { stamps, notificationStates }
})

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
    notificationServiceStarted(state) {
      state.isNotificationServiceRunning = true
      stopNotificationService()
      startNotificationsService(
        JSON.parse(JSON.stringify(state.timeStamps)),
        JSON.parse(JSON.stringify(state.notificationStates))
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
      .addCase(fetchConfigs.fulfilled, (state, action) => {
        const configsData = action.payload
        state.notificationStates = {
          startTimetableNotifications:
            configsData.timetableConfigs.startNotifications,
          endTimetableNotifications:
            configsData.timetableConfigs.endNotifications,
          startTimetableNotificationsBefore:
            configsData.timetableConfigs.startNotificationsBefore,
          endTimetableNotificationsBefore:
            configsData.timetableConfigs.endNotificationsBefore,
          todoNotifications: configsData.todoConfigs.notifications
        }
      })
      .addCase(fetchBlocks.fulfilled, (state, action) => {
        const currentDay = getCurrentDayString()
        const dayData = action.payload[currentDay]
        const oldStamps = JSON.parse(JSON.stringify(state.timeStamps))
        state.timeStamps = generateTimetableTimeStamps(dayData, oldStamps)
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        const todosData = action.payload
        const oldStamps = JSON.parse(JSON.stringify(state.timeStamps))
        state.timeStamps = generateTodoTimeStamps(todosData.todos, oldStamps)
      })
      .addCase(updateTimeStamps.fulfilled, (state, action) => {
        state.timeStamps = action.payload.stamps
        state.notificationStates = action.payload.notificationStates
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
