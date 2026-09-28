import { configureStore } from '@reduxjs/toolkit';
import ideaReducer from './slices/ideaSlice';

const store = configureStore({
    reducer: {
        idea: ideaReducer
    }
});

export default store;