/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getElectronContext, saveConfigToDisk } from '../../utils/electronUtils'

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
    showCurrentTime: true,
    showCurrentBlock: true
  },
  appConfigs: {
    closeOnExit: false,
    darkMode: true,
    openMinimized: false
  },
  error: '',
  status: ''
}

export const fetchConfigs = createAsyncThunk('userConfigs/fetch', async () => {
  const electron = getElectronContext()
  const response = await electron.getUserConfigs()
  let data = {
    timetableConfigs: initialState.timetableConfigs,
    appConfigs: initialState.appConfigs
  }
  if (response) {
    data = {
      timetableConfigs: {
        ...data.timetableConfigs,
        ...response.timetableConfigs
      },
      appConfigs: { ...data.appConfigs, ...response.appConfigs }
    }
  }
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
      saveConfigToDisk(
        'appConfigs.openMinimized',
        state.appConfigs.openMinimized
      )
    },

    showCurrentTimeToggled(state) {
      state.timetableConfigs.showCurrentTime =
        !state.timetableConfigs.showCurrentTime
      saveConfigToDisk(
        'timetableConfigs.showCurrentTime',
        state.timetableConfigs.showCurrentTime
      )
    },

    showCurrentBlockToggled(state) {
      state.timetableConfigs.showCurrentBlock =
        !state.timetableConfigs.showCurrentBlock
      saveConfigToDisk(
        'timetableConfigs.showCurrentBlock',
        state.timetableConfigs.showCurrentBlock
      )
    },

    startNotificationsToggled(state) {
      state.timetableConfigs.startNotifications =
        !state.timetableConfigs.startNotifications
      saveConfigToDisk(
        'timetableConfigs.startNotifications',
        state.timetableConfigs.startNotifications
      )
    },

    endNotificationsToggled(state) {
      state.timetableConfigs.endNotifications =
        !state.timetableConfigs.endNotifications
      saveConfigToDisk(
        'timetableConfigs.endNotifications',
        state.timetableConfigs.endNotifications
      )
    },

    notificationsToggled(state) {
      if (
        state.timetableConfigs.startNotifications ||
        state.timetableConfigs.endNotifications
      ) {
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
      saveConfigToDisk(
        'timetableConfigs.endNotifications',
        state.timetableConfigs.endNotifications
      )
    },

    dayToShowToggled(state, action: PayloadAction<DayStringTypes>) {
      state.timetableConfigs.daysToShow[action.payload] =
        !state.timetableConfigs.daysToShow[action.payload]
      saveConfigToDisk(
        'timetableConfigs.daysToShow',
        JSON.parse(JSON.stringify(state.timetableConfigs.daysToShow))
      )
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchConfigs.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchConfigs.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.timetableConfigs = action.payload.timetableConfigs
        state.appConfigs = action.payload.appConfigs
      })
      .addCase(fetchConfigs.rejected, state => {
        state.status = 'failed'
        state.error =
          'Error fetching data from the disk. Try restarting the app.'
      })
  }
})

export const {
  startNotificationsToggled,
  endNotificationsToggled,
  darkModeToggled,
  closeOnExitToggled,
  showCurrentTimeToggled,
  showCurrentBlockToggled,
  openMinimizedToggled,
  dayToShowToggled,
  notificationsToggled
} = userConfigsSlice.actions

export default userConfigsSlice.reducer

// Selectors
export const selectConfigs = (state: IState) => ({
  app: state.configs.appConfigs,
  timetable: state.configs.timetableConfigs
})
export const selectNotificationStateCombined = (state: IState) =>
  state.configs.timetableConfigs.startNotifications ||
  state.configs.timetableConfigs.endNotifications
export const selectStartNotification = (state: IState) =>
  state.configs.timetableConfigs.startNotifications
export const selectEndNotification = (state: IState) =>
  state.configs.timetableConfigs.endNotifications
export const selectDarkMode = (state: IState) =>
  state.configs.appConfigs.darkMode
export const selectCloseOnExit = (state: IState) =>
  state.configs.appConfigs.closeOnExit
export const selectShowCurrentTime = (state: IState) =>
  state.configs.timetableConfigs.showCurrentTime
export const selectShowCurrentBlock = (state: IState) =>
  state.configs.timetableConfigs.showCurrentBlock
export const selectDaysToShow = (state: IState) =>
  state.configs.timetableConfigs.daysToShow
