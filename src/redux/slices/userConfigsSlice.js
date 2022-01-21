import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getElectronContext } from '../helpers/ElectronContext';

const initialState = {
    configurations: {
        notifications: false,
        darkMode: false,
    },
    status: 'idle',
    error: null
}

export const fetchUserConfigs = createAsyncThunk('userConfigs/fetch', async () => {
    const electron = getElectronContext()
    const response = await electron.getUserConfigs()
    return {
        ...initialState.configurations,
        ...response
    }
})

const userConfigsSlice = createSlice({
    name: 'userConfigs',
    initialState,
    reducers: {
        notificationsToggled(state, action) {
            state.notifications = !(state.notifications)
        },
        darkModeToggled(state, action) {
            state.darkMode = !(state.darkMode)
        }
    },
    extraReducers(builder) {
        builder
          .addCase(fetchUserConfigs.pending, (state, action) => {
            state.status = 'loading';
          })
          .addCase(fetchUserConfigs.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.configurations = action.payload
          })
          .addCase(fetchUserConfigs.rejected, (state, action) => {
            state.status = 'failed';
            state.error =
              'Error fetching data from the disk. Try restarting the app.';
          });
      },
})

export const { notificationsToggled, darkModeToggled } = userConfigsSlice.actions

export default userConfigsSlice.reducer

// Selectors
export const selectNotificationState = (state) => state.userConfigs.configurations.notifications
