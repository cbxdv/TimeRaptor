import { configureStore } from '@reduxjs/toolkit';

import blocksReducer from './slices/timeBlocksSlice';
import usrConfigsReducer from './slices/userConfigsSlice';

export default configureStore({
  reducer: {
    blocks: blocksReducer,
    userConfigs: usrConfigsReducer
  }
});
