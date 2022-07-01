/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchWaterTrackerData } from '../../utils/electronUtils'
import { IState, IWaterTrackerState } from '../../@types/StateInterfaces'
import { startWaterTrackerService, stopWaterTrackerService } from '../../utils/waterTrackerService'
import { fetchConfigs } from './configsSlice'
import { getAlreadyCompletedTime } from '../../utils/waterTrackerUtils'

const initialState: IWaterTrackerState = {
  isWaterTrackerRunning: false,
  notifications: true,
  waterInterval: 30,
  lastStarted: 0
}

export const updateWaterTrackerData = createAsyncThunk('waterTracker/update', async () => {
  const waterTrackerData = await fetchWaterTrackerData()
  return waterTrackerData
})

const waterTrackerSlice = createSlice({
  name: 'waterTracker',
  initialState,
  reducers: {
    waterTrackerStarted(state) {
      state.isWaterTrackerRunning = true
      const alreadyCompleted = getAlreadyCompletedTime(
        JSON.parse(JSON.stringify(state.lastStarted)),
        JSON.parse(JSON.stringify(state.waterInterval))
      )
      stopWaterTrackerService()
      startWaterTrackerService({
        intervalValue: JSON.parse(JSON.stringify(state.waterInterval)),
        notifications: JSON.parse(JSON.stringify(state.notifications)),
        alreadyCompleted
      })
      state.lastStarted = new Date().valueOf()
    },

    waterTrackerStopped(state) {
      state.isWaterTrackerRunning = false
      state.lastStarted = 0
      stopWaterTrackerService()
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchConfigs.fulfilled, (state, action) => {
        state.notifications = action.payload.waterTrackerConfigs.notifications
        state.waterInterval = action.payload.waterTrackerConfigs.waterInterval
      })
      .addCase(updateWaterTrackerData.fulfilled, (state, action) => {
        const waterTrackerData = action.payload
        const isRunning = JSON.parse(JSON.stringify(state.isWaterTrackerRunning))

        if (isRunning) {
          const alreadyCompleted = getAlreadyCompletedTime(
            JSON.parse(JSON.stringify(state.lastStarted)),
            waterTrackerData.waterInterval
          )
          stopWaterTrackerService()
          startWaterTrackerService({
            intervalValue: waterTrackerData.waterInterval,
            notifications: waterTrackerData.notifications,
            alreadyCompleted
          })
        }
      })
  }
})

export default waterTrackerSlice.reducer

export const { waterTrackerStarted, waterTrackerStopped } = waterTrackerSlice.actions

export const selectIsWaterTrackerServiceRunning = (state: IState) =>
  state.waterTracker.isWaterTrackerRunning
export const selectWaterTrackerLastStarted = (state: IState) => state.waterTracker.lastStarted
