import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getElectronContext, saveConfigToDisk } from '../helpers/ElectronContext';

const initialState = {
  configurations: {
    platform: 'darwin',
    notifications: false,
    darkMode: true,
    maximized: false,
    closeOnExit: false,
  },
  status: 'loading',
  error: null,
};

export const fetchUserConfigs = createAsyncThunk('userConfigs/fetch', async () => {
  const electron = getElectronContext();
  const response = await electron.getUserConfigs();
  response.maximized = false;
  return {
    ...initialState.configurations,
    ...response,
  };
});

const userConfigsSlice = createSlice({
  name: 'userConfigs',
  initialState,
  reducers: {
    notificationsToggled(state, action) {
      state.configurations.notifications = !state.configurations.notifications;
      saveConfigToDisk('notifications', state.configurations.notifications);
    },
    darkModeToggled(state, action) {
      state.configurations.darkMode = !state.configurations.darkMode;
      saveConfigToDisk('darkMode', state.configurations.darkMode);
    },
    maximizedToggled(state, action) {
      state.configurations.maximized = !state.configurations.maximized
    },
    closeOnExitToggled(state, action) {
      state.configurations.closeOnExit = !state.configurations.closeOnExit;
      saveConfigToDisk('closeOnExit', state.configurations.closeOnExit);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserConfigs.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchUserConfigs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.configurations = action.payload;
      })
      .addCase(fetchUserConfigs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'Error fetching data from the disk. Try restarting the app.';
      });
  },
});

export const { notificationsToggled, darkModeToggled, maximizedToggled, closeOnExitToggled } = userConfigsSlice.actions;

export default userConfigsSlice.reducer;

// Selectors
export const selectConfigurations = (state) => state.userConfigs.configurations;
export const selectNotificationState = (state) =>
  state.userConfigs.configurations.notifications;
export const selectDarkMode = (state) => state.userConfigs.configurations.darkMode;
export const selectPlatform = state => state.userConfigs.configurations.platform
export const selectMaximized = state => state.userConfigs.configurations.maximized
export const selectcloseOnExit = state => state.userConfigs.configurations.closeOnExit