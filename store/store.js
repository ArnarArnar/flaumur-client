import { configureStore } from '@reduxjs/toolkit';

import queryReducer from './slices/querySlice.js';

export default configureStore({
    reducer: {
        query: queryReducer
    }
});
