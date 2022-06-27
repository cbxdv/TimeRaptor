/* eslint-disable no-param-reassign */

import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit'

import { IDayPlannerState, IState } from '../../@types/StateInterfaces'
import {
  IDayPlannerBlockPayloadAction,
  IDayPlannerBlocksUpdatePayloadAction,
  IDayPlannerData
} from '../../@types/DayPlannerInterfaces'
import {
  fetchDayPlannerDataFromDisk,
  updateDayPlannerDataToDisk
} from '../../utils/electronUtils'
import { dayPlannerDayProcedures } from '../../utils/dayPlannerUtils'

const initialState: IDayPlannerState = {
  lastUpdated: 0,
  dayData: {
    currentDay: [],
    nextDay: []
  },
  status: 'loading',
  error: null
}

export const fetchDayPlannerBlocks = createAsyncThunk(
  'dayPlanner/fetchData',
  async () => {
    const response = await fetchDayPlannerDataFromDisk()
    const data = await dayPlannerDayProcedures(response)
    return data
  }
)

const dayPlannerSlice = createSlice({
  name: 'dayPlanner',
  initialState,
  reducers: {
    blockAdded(state, action: PayloadAction<IDayPlannerBlockPayloadAction>) {
      const { day } = action.payload
      const block = action.payload
      block.id = nanoid()
      state.dayData[day].push(action.payload)
      state.lastUpdated = new Date().valueOf()

      const data: IDayPlannerData = {
        lastUpdated: JSON.parse(JSON.stringify(state.lastUpdated)),
        dayData: JSON.parse(JSON.stringify(state.dayData))
      }
      updateDayPlannerDataToDisk(data)
    },

    blockDeleted(state, action: PayloadAction<IDayPlannerBlockPayloadAction>) {
      const { id, day } = action.payload
      state.dayData[day] = state.dayData[day].filter(block => block.id !== id)
      state.lastUpdated = new Date().valueOf()

      const data: IDayPlannerData = {
        lastUpdated: JSON.parse(JSON.stringify(state.lastUpdated)),
        dayData: JSON.parse(JSON.stringify(state.dayData))
      }
      updateDayPlannerDataToDisk(data)
    },

    blockUpdated(
      state,
      action: PayloadAction<IDayPlannerBlocksUpdatePayloadAction>
    ) {
      const { oldBlock, newBlock } = action.payload

      // Deleting existing block
      state.dayData[oldBlock.day] = state.dayData[oldBlock.day].filter(
        block => block.id !== oldBlock.id
      )

      // Adding new block
      state.dayData[newBlock.day].push(newBlock)

      state.lastUpdated = new Date().valueOf()

      const data: IDayPlannerData = {
        lastUpdated: JSON.parse(JSON.stringify(state.lastUpdated)),
        dayData: JSON.parse(JSON.stringify(state.dayData))
      }
      updateDayPlannerDataToDisk(data)
    },

    blocksCleared(state) {
      state.dayData = initialState.dayData
      state.lastUpdated = new Date().valueOf()

      const data: IDayPlannerData = {
        lastUpdated: JSON.parse(JSON.stringify(state.lastUpdated)),
        dayData: JSON.parse(JSON.stringify(state.dayData))
      }
      updateDayPlannerDataToDisk(data)
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDayPlannerBlocks.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchDayPlannerBlocks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.lastUpdated = action.payload.lastUpdated
        state.dayData = action.payload.dayData
      })
      .addCase(fetchDayPlannerBlocks.rejected, state => {
        state.status = 'failed'
        state.error =
          'Error fetching data from the disk. Try restarting the app.'
      })
  }
})

export const { blockAdded, blockUpdated, blockDeleted, blocksCleared } =
  dayPlannerSlice.actions

export default dayPlannerSlice.reducer

// Selector
export const selectCurrentDayPlannerBlocks = (state: IState) =>
  state.dayPlanner.dayData.currentDay
export const selectNextDayPlannerBlocks = (state: IState) =>
  state.dayPlanner.dayData.nextDay
