/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { fetchConfigsData, saveConfigToDisk } from '../../utils/electronUtils'

import { IState, IConfigsState } from '../../@types/StateInterfaces'
import { DayStringTypes } from '../../@types/DayAndTimeInterfaces'

const initialState: IConfigsState = {
  timetableConfigs: {
    daysToShow: {
      sunday: true,
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true
    },
    startNotifications: true,
    endNotifications: true,
    startNotificationsBefore: 0,
    endNotificationsBefore: 0,
    showCurrentTime: true,
    showCurrentBlock: true
  },
  todoConfigs: {
    notifications: true,
    dayProcedures: true
  },
  appConfigs: {
    closeOnExit: false,
    darkMode: true,
    openMinimized: false
  },
  dayPlannerConfigs: {
    dayProcedures: true,
    showCurrentTime: true,
    startNotifications: true,
    endNotifications: true,
    startNotificationsBefore: 0,
    endNotificationsBefore: 0
  },
  error: '',
  status: ''
}

export const fetchConfigs = createAsyncThunk('userConfigs/fetch', async () => {
  const data = await fetchConfigsData()
  return data
})

const userConfigsSlice = createSlice({
  name: 'userConfigs',
  initialState,
  reducers: {
    darkModeToggled(state) {
      state.appConfigs.darkMode = !state.appConfigs.darkMode
      saveConfigToDisk('appConfigs.darkMode', state.appConfigs.darkMode)
    },

    closeOnExitToggled(state) {
      state.appConfigs.closeOnExit = !state.appConfigs.closeOnExit
      saveConfigToDisk('appConfigs.closeOnExit', state.appConfigs.closeOnExit)
    },

    openMinimizedToggled(state) {
      state.appConfigs.openMinimized = !state.appConfigs.openMinimized
      saveConfigToDisk('appConfigs.openMinimized', state.appConfigs.openMinimized)
    },

    timetableShowCurrentTimeToggled(state) {
      state.timetableConfigs.showCurrentTime = !state.timetableConfigs.showCurrentTime
      saveConfigToDisk('timetableConfigs.showCurrentTime', state.timetableConfigs.showCurrentTime)
    },

    timetableShowCurrentBlockToggled(state) {
      state.timetableConfigs.showCurrentBlock = !state.timetableConfigs.showCurrentBlock
      saveConfigToDisk('timetableConfigs.showCurrentBlock', state.timetableConfigs.showCurrentBlock)
    },

    timetableStartNotificationsToggled(state) {
      state.timetableConfigs.startNotifications = !state.timetableConfigs.startNotifications
      saveConfigToDisk(
        'timetableConfigs.startNotifications',
        state.timetableConfigs.startNotifications
      )
    },

    timetableEndNotificationsToggled(state) {
      state.timetableConfigs.endNotifications = !state.timetableConfigs.endNotifications
      saveConfigToDisk('timetableConfigs.endNotifications', state.timetableConfigs.endNotifications)
    },

    timetableNotificationsToggled(state) {
      if (state.timetableConfigs.startNotifications || state.timetableConfigs.endNotifications) {
        state.timetableConfigs.startNotifications = false
        state.timetableConfigs.endNotifications = false
      } else {
        state.timetableConfigs.startNotifications = true
        state.timetableConfigs.endNotifications = true
      }

      saveConfigToDisk(
        'timetableConfigs.startNotifications',
        state.timetableConfigs.startNotifications
      )
      saveConfigToDisk('timetableConfigs.endNotifications', state.timetableConfigs.endNotifications)
    },

    timetableDaysToShowToggled(state, action: PayloadAction<DayStringTypes>) {
      state.timetableConfigs.daysToShow[action.payload] =
        !state.timetableConfigs.daysToShow[action.payload]
      saveConfigToDisk(
        'timetableConfigs.daysToShow',
        JSON.parse(JSON.stringify(state.timetableConfigs.daysToShow))
      )
    },

    timetableStartNotificationsBeforeChanged(state, action: PayloadAction<number>) {
      state.timetableConfigs.startNotificationsBefore = action.payload
      saveConfigToDisk('timetableConfigs.startNotificationsBefore', action.payload)
    },

    timetableEndNotificationsBeforeChanged(state, action: PayloadAction<number>) {
      state.timetableConfigs.endNotificationsBefore = action.payload
      saveConfigToDisk('timetableConfigs.endNotificationsBefore', action.payload)
    },

    todoNotificationToggled(state) {
      state.todoConfigs.notifications = !state.todoConfigs.notifications
      saveConfigToDisk('todoConfigs.notifications', state.todoConfigs.notifications)
    },

    todoDayProceduresToggled(state) {
      state.todoConfigs.dayProcedures = !state.todoConfigs.dayProcedures
      saveConfigToDisk('todoConfigs.dayProcedures', state.todoConfigs.dayProcedures)
    },

    dayPlannerShowCurrentTimeToggled(state) {
      state.dayPlannerConfigs.showCurrentTime = !state.dayPlannerConfigs.showCurrentTime
      saveConfigToDisk('dayPlannerConfigs.showCurrentTime', state.dayPlannerConfigs.showCurrentTime)
    },

    dayPlannerDayProceduresToggled(state) {
      state.dayPlannerConfigs.dayProcedures = !state.dayPlannerConfigs.dayProcedures
      saveConfigToDisk('dayPlannerConfigs.showCurrentBlock', state.dayPlannerConfigs.dayProcedures)
    },

    dayPlannerStartNotificationsToggled(state) {
      state.dayPlannerConfigs.startNotifications = !state.dayPlannerConfigs.startNotifications
      saveConfigToDisk(
        'dayPlannerConfigs.startNotifications',
        state.dayPlannerConfigs.startNotifications
      )
    },

    dayPlannerEndNotificationsToggled(state) {
      state.dayPlannerConfigs.endNotifications = !state.dayPlannerConfigs.endNotifications
      saveConfigToDisk(
        'dayPlannerConfigs.endNotifications',
        state.dayPlannerConfigs.endNotifications
      )
    },

    dayPlannerNotificationsToggled(state) {
      if (state.dayPlannerConfigs.startNotifications || state.dayPlannerConfigs.endNotifications) {
        state.dayPlannerConfigs.startNotifications = false
        state.dayPlannerConfigs.endNotifications = false
      } else {
        state.dayPlannerConfigs.startNotifications = true
        state.dayPlannerConfigs.endNotifications = true
      }

      saveConfigToDisk(
        'dayPlannerConfigs.startNotifications',
        state.dayPlannerConfigs.startNotifications
      )
      saveConfigToDisk(
        'dayPlannerConfigs.endNotifications',
        state.dayPlannerConfigs.endNotifications
      )
    },

    dayPlannerStartNotificationsBeforeChanged(state, action: PayloadAction<number>) {
      state.dayPlannerConfigs.startNotificationsBefore = action.payload
      saveConfigToDisk('dayPlannerConfigs.startNotificationsBefore', action.payload)
    },

    dayPlannerEndNotificationsBeforeChanged(state, action: PayloadAction<number>) {
      state.dayPlannerConfigs.endNotificationsBefore = action.payload
      saveConfigToDisk('dayPlannerConfigs.endNotificationsBefore', action.payload)
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchConfigs.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchConfigs.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.dayPlannerConfigs = action.payload.dayPlannerConfigs
        state.appConfigs = action.payload.appConfigs
      })
      .addCase(fetchConfigs.rejected, state => {
        state.status = 'failed'
        state.error = 'Error fetching data from the disk. Try restarting the app.'
      })
  }
})

export const {
  timetableStartNotificationsToggled,
  timetableEndNotificationsToggled,
  darkModeToggled,
  closeOnExitToggled,
  timetableShowCurrentTimeToggled,
  timetableShowCurrentBlockToggled,
  openMinimizedToggled,
  timetableDaysToShowToggled,
  timetableNotificationsToggled,
  timetableStartNotificationsBeforeChanged,
  timetableEndNotificationsBeforeChanged,
  todoNotificationToggled,
  todoDayProceduresToggled,
  dayPlannerShowCurrentTimeToggled,
  dayPlannerNotificationsToggled,
  dayPlannerStartNotificationsToggled,
  dayPlannerEndNotificationsToggled,
  dayPlannerStartNotificationsBeforeChanged,
  dayPlannerEndNotificationsBeforeChanged,
  dayPlannerDayProceduresToggled
} = userConfigsSlice.actions

export default userConfigsSlice.reducer

// Selectors
export const selectConfigs = (state: IState) => ({
  app: state.configs.appConfigs,
  timetable: state.configs.timetableConfigs,
  todo: state.configs.todoConfigs,
  dayPlanner: state.configs.dayPlannerConfigs
})
export const selectTimetableNotificationStateCombined = (state: IState) =>
  state.configs.timetableConfigs.startNotifications ||
  state.configs.timetableConfigs.endNotifications
export const selectTimetableStartNotifications = (state: IState) =>
  state.configs.timetableConfigs.startNotifications
export const selectTimetableEndNotifications = (state: IState) =>
  state.configs.timetableConfigs.endNotifications
export const selectDarkMode = (state: IState) => state.configs.appConfigs.darkMode
export const selectCloseOnExit = (state: IState) => state.configs.appConfigs.closeOnExit
export const selectTimetableShowCurrentTime = (state: IState) =>
  state.configs.timetableConfigs.showCurrentTime
export const selectTimetableShowCurrentBlock = (state: IState) =>
  state.configs.timetableConfigs.showCurrentBlock
export const selectTimetableDaysToShow = (state: IState) =>
  state.configs.timetableConfigs.daysToShow
export const selectTimetableStartNotificationsBefore = (state: IState) =>
  state.configs.timetableConfigs.startNotificationsBefore
export const selectTimetableEndNotificationsBefore = (state: IState) =>
  state.configs.timetableConfigs.endNotificationsBefore
export const selectTodoNotifications = (state: IState) => state.configs.todoConfigs.notifications
export const selectDayPlannerNotificaionStateCombined = (state: IState) =>
  state.configs.dayPlannerConfigs.startNotifications ||
  state.configs.dayPlannerConfigs.endNotifications
export const selectDayPlannerShowCurrentTime = (state: IState) =>
  state.configs.dayPlannerConfigs.showCurrentTime
