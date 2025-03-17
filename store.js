import { configureStore } from '@reduxjs/toolkit';
import { landingSlice } from './src/pages/landing/landingSlice';
import { productSlice } from './src/pages/products/productSlice';

const store = configureStore({
    reducer: {
        categories: landingSlice.reducer,
        products: productSlice.reducer
    }
})

export default store