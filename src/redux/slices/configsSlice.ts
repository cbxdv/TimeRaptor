/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import {
  getElectronContext,
  saveConfigToDisk
} from '../../utils/electronContext'

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
    notifyBefore: 0,
    notifications: true,
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
    ttShowCurrentTimeToggled(state) {
      state.timetableConfigs.showCurrentTime =
        !state.timetableConfigs.showCurrentTime
      saveConfigToDisk(
        'timetableConfigs.showCurrentTime',
        state.timetableConfigs.showCurrentTime
      )
    },
    ttShowCurrentBlockToggled(state) {
      state.timetableConfigs.showCurrentBlock =
        !state.timetableConfigs.showCurrentBlock
      saveConfigToDisk(
        'timetableConfigs.showCurrentBlock',
        state.timetableConfigs.showCurrentBlock
      )
    },
    ttNotificationsToggled(state) {
      state.timetableConfigs.notifications =
        !state.timetableConfigs.notifications
      saveConfigToDisk(
        'timetableConfigs.notifications',
        state.timetableConfigs.notifications
      )
    },
    ttDayToShowToggled(state, action: PayloadAction<DayStringTypes>) {
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
  ttNotificationsToggled,
  darkModeToggled,
  closeOnExitToggled,
  ttShowCurrentTimeToggled,
  ttShowCurrentBlockToggled,
  openMinimizedToggled,
  ttDayToShowToggled
} = userConfigsSlice.actions

export default userConfigsSlice.reducer

// Selectors
export const selectConfigs = (state: IState) => ({
  app: state.configs.appConfigs,
  timetable: state.configs.timetableConfigs
})
export const selectTTNotificationState = (state: IState) =>
  state.configs.timetableConfigs.notifications
export const selectDarkMode = (state: IState) =>
  state.configs.appConfigs.darkMode
export const selectCloseOnExit = (state: IState) =>
  state.configs.appConfigs.closeOnExit
export const selectTTShowCurrentTime = (state: IState) =>
  state.configs.timetableConfigs.showCurrentTime
export const selectTTShowCurrentBlock = (state: IState) =>
  state.configs.timetableConfigs.showCurrentBlock
export const selectTTDaysToShow = (state: IState) =>
  state.configs.timetableConfigs.daysToShow
