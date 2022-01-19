import { configureStore } from '@reduxjs/toolkit';

import blocksReducer from './slices/timeBlocksSlice.js';

export default configureStore({
  reducer: {
    blocks: blocksReducer,
  },
});
