/* eslint-disable no-param-reassign */

import {
  createSlice,
  createAsyncThunk,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit'
import {
  fetchTimetableData,
  saveBlocksToDisk
} from '../../utils/electronContext'

import { IState, ITimetableState } from '../../@types/StateInterfaces'
import {
  TimeBlockPayloadAction,
  TimeBlockUpdatePayloadAction
} from '../../@types/TimeBlockInterfaces'
import { DayStringTypes } from '../../@types/DayAndTimeInterfaces'

const initialState: ITimetableState = {
  dayData: {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
  },
  status: 'loading',
  error: null
}

export const fetchBlocks = createAsyncThunk(
  'timetable/fetchBlocks',
  async () => {
    const response = fetchTimetableData()
    return response
  }
)

const blocksSlice = createSlice({
  name: 'timetable',
  initialState,
  reducers: {
    blockAdded(state, action: PayloadAction<TimeBlockPayloadAction>) {
      const { day } = action.payload
      const specificDay = state.dayData[day]
      if (specificDay) {
        action.payload.id = nanoid()
        specificDay.push(action.payload)
        state.dayData[day] = specificDay
      }
      saveBlocksToDisk(JSON.parse(JSON.stringify(state.dayData)))
    },

    blockDeleted(state, action: PayloadAction<TimeBlockPayloadAction>) {
      const { id, day } = action.payload
      let specificDay = state.dayData[day]
      if (specificDay) {
        specificDay = specificDay.filter(block => block.id !== id)
        state.dayData[day] = specificDay
      }
      saveBlocksToDisk(JSON.parse(JSON.stringify(state.dayData)))
    },

    blockUpdated(state, action: PayloadAction<TimeBlockUpdatePayloadAction>) {
      const { oldBlock, newBlock } = action.payload

      // Deleting existing block
      let specificDay = state.dayData[oldBlock.day]
      if (specificDay) {
        specificDay = specificDay.filter(block => block.id !== oldBlock.id)
        state.dayData[oldBlock.day] = specificDay
      }

      // Adding new block
      specificDay = state.dayData[newBlock.day]
      if (specificDay) {
        specificDay.push(newBlock)
        state.dayData[newBlock.day] = specificDay
      }
      saveBlocksToDisk(JSON.parse(JSON.stringify(state.dayData)))
    },

    blocksCleared(state) {
      state.dayData = initialState.dayData
      saveBlocksToDisk(JSON.parse(JSON.stringify(state.dayData)))
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBlocks.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchBlocks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.dayData = action.payload
      })
      .addCase(fetchBlocks.rejected, state => {
        state.status = 'failed'
        state.error =
          'Error fetching data from the disk. Try restarting the app.'
      })
  }
})

export const { blockAdded, blockDeleted, blockUpdated, blocksCleared } =
  blocksSlice.actions

export default blocksSlice.reducer

// Selectors
export const selectBlocksByDay = (state: IState, day: DayStringTypes) =>
  state.timetable.dayData[day]
