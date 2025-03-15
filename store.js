import { configureStore } from '@reduxjs/toolkit';
import { landingSlice } from './src/pages/landing/landingSlice';

const store = configureStore({
    reducer: {
        categories: landingSlice.reducer
    }
})

export default store