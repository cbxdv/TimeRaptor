/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getElectronContext,
  saveConfigToDisk
} from '../../utils/ElectronContext';

const initialState = {
  configurations: {
    platform: 'darwin',
    notifications: false,
    darkMode: true,
    maximized: false,
    closeOnExit: false,
    showCurrentTime: true,
    showCurrentBlock: true,
    openMinimized: false,
    appVersion: '123'
  },
  status: 'loading',
  error: null
};

export const fetchUserConfigs = createAsyncThunk(
  'userConfigs/fetch',
  async () => {
    const electron = getElectronContext();
    const response = await electron.getUserConfigs();
    response.maximized = false;
    return {
      ...initialState.configurations,
      ...response
    };
  }
);

const userConfigsSlice = createSlice({
  name: 'userConfigs',
  initialState,
  reducers: {
    notificationsToggled(state) {
      state.configurations.notifications = !state.configurations.notifications;
      saveConfigToDisk('notifications', state.configurations.notifications);
    },
    darkModeToggled(state) {
      state.configurations.darkMode = !state.configurations.darkMode;
      saveConfigToDisk('darkMode', state.configurations.darkMode);
    },
    maximizedToggled(state) {
      state.configurations.maximized = !state.configurations.maximized;
    },
    closeOnExitToggled(state) {
      state.configurations.closeOnExit = !state.configurations.closeOnExit;
      saveConfigToDisk('closeOnExit', state.configurations.closeOnExit);
    },
    showCurrentTimeToggled(state) {
      state.configurations.showCurrentTime =
        !state.configurations.showCurrentTime;
      saveConfigToDisk('showCurrentTime', state.configurations.showCurrentTime);
    },
    showCurrentBlockToggled(state) {
      state.configurations.showCurrentBlock =
        !state.configurations.showCurrentBlock;
      saveConfigToDisk(
        'showCurrentBlock',
        state.configurations.showCurrentBlock
      );
    },
    openMinimizedToggled(state) {
      state.configurations.openMinimized = !state.configurations.openMinimized;
      saveConfigToDisk('openMinimized', state.configurations.openMinimized);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserConfigs.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUserConfigs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.configurations = action.payload;
      })
      .addCase(fetchUserConfigs.rejected, state => {
        state.status = 'failed';
        state.error =
          'Error fetching data from the disk. Try restarting the app.';
      });
  }
});

export const {
  notificationsToggled,
  darkModeToggled,
  maximizedToggled,
  closeOnExitToggled,
  showCurrentTimeToggled,
  showCurrentBlockToggled,
  openMinimizedToggled
} = userConfigsSlice.actions;

export default userConfigsSlice.reducer;

// Selectors
export const selectConfigurations = state => state.userConfigs.configurations;
export const selectNotificationState = state =>
  state.userConfigs.configurations.notifications;
export const selectDarkMode = state =>
  state.userConfigs.configurations.darkMode;
export const selectPlatform = state =>
  state.userConfigs.configurations.platform;
export const selectMaximized = state =>
  state.userConfigs.configurations.maximized;
export const selectCloseOnExit = state =>
  state.userConfigs.configurations.closeOnExit;
export const selectShowCurrentTime = state =>
  state.userConfigs.configurations.showCurrentTime;
export const selectShowCurrentBlock = state =>
  state.userConfigs.configurations.showCurrentBlock;
