import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import { getElectronContext, saveBlocksToDisk } from '../helpers/ElectronContext';

const initialState = {
  dayData: {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  },
  currentBlock: null,
  status: 'loading',
  error: null,
};

export const fetchBlocks = createAsyncThunk('blocks/fetchBlocks', async () => {
  const electron = getElectronContext();
  const response = await electron.getAllTimeBlocks();
  if (!response) {
    return initialState.dayData;
  }
  if (Object.keys(response).length !== 7) {
    return {
      ...initialState.dayData,
      ...response,
    };
  }
  return response;
});

const blocksSlice = createSlice({
  name: 'blocks',
  initialState,
  reducers: {
    blockAdded(state, action) {
      const { day } = action.payload;
      let specificDay = state.dayData[day];
      if (specificDay) {
        action.payload.id = nanoid();
        specificDay.push(action.payload);
        state.dayData[day] = specificDay;
      }
      saveBlocksToDisk(JSON.parse(JSON.stringify(state.dayData)));
    },
    blockDeleted(state, action) {
      const { id, day } = action.payload;
      let specificDay = state.dayData[day];
      if (specificDay) {
        specificDay = specificDay.filter((block) => {
          if (block.id !== id) {
            return block;
          }
        });
        state.dayData[day] = specificDay;
      }
      saveBlocksToDisk(JSON.parse(JSON.stringify(state.dayData)));
    },
    blockUpdated(state, action) {
      const { oldBlock, newBlock } = action.payload;

      // Deleting existing block
      let specificDay = state.dayData[oldBlock.day];
      if (specificDay) {
        specificDay = specificDay.filter((block) => {
          if (block.id !== oldBlock.id) {
            return block;
          }
        });
        state.dayData[oldBlock.day] = specificDay;
      }

      // Adding new block
      specificDay = state.dayData[newBlock.day];
      if (specificDay) {
        specificDay.push(newBlock);
        state.dayData[newBlock.day] = specificDay;
      }
      saveBlocksToDisk(JSON.parse(JSON.stringify(state.dayData)));
    },
    blocksCleared(state, action) {
      state.dayData = initialState.dayData;
      saveBlocksToDisk(JSON.parse(JSON.stringify(state.dayData)));
    },
    currentBlockChanged(state, action) {
      state.currentBlock = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBlocks.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchBlocks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.dayData = action.payload;
      })
      .addCase(fetchBlocks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'Error fetching data from the disk. Try restarting the app.';
      });
  },
});

export const { blockAdded, blockDeleted, blockUpdated, blocksCleared, currentBlockChanged } =
  blocksSlice.actions;

export default blocksSlice.reducer;

// Selectors
export const selectBlocksByDay = (state, day) => state.blocks.dayData[day];
export const selectCurrentBlock = state => state.blocks.currentBlock