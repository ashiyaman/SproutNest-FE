import { configureStore } from '@reduxjs/toolkit';
import { landingSlice } from './src/pages/landing/landingSlice';
import { productSlice } from './src/pages/products/productSlice';
import { productCardSlice } from './src/components/productCard/productCardSlice';

const store = configureStore({
    reducer: {
        categories: landingSlice.reducer,
        products: productSlice.reducer,
        productCard: productCardSlice.reducer
    }
})

export default store