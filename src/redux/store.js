import { configureStore } from '@reduxjs/toolkit';

import blocksReducer from './slices/timeBlocksSlice.js';
import usrConfigsReducer from './slices/userConfigsSlice.js';

export default configureStore({
  reducer: {
    blocks: blocksReducer,
    userConfigs: usrConfigsReducer,
  },
});
