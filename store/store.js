import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './slices/countSlice.js';
import queryReducer from './slices/querySlice.js';

export default configureStore({
    reducer: {
        counter: counterReducer,
        query: queryReducer
    }
});
