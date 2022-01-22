import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getElectronContext, saveConfigToDisk } from '../helpers/ElectronContext';

const initialState = {
  configurations: {
    notifications: false,
    darkMode: false,
  },
  status: 'idle',
  error: null,
};

export const fetchUserConfigs = createAsyncThunk('userConfigs/fetch', async () => {
  const electron = getElectronContext();
  const response = await electron.getUserConfigs();
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

export const { notificationsToggled, darkModeToggled } = userConfigsSlice.actions;

export default userConfigsSlice.reducer;

// Selectors
export const selectConfigurations = (state) => state.userConfigs.configurations;
export const selectNotificationState = (state) =>
  state.userConfigs.configurations.notifications;
export const selectDarkMode = (state) => state.userConfigs.configurations.darkMode;
