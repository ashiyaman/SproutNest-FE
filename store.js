import { configureStore } from '@reduxjs/toolkit';
import { landingSlice } from './src/pages/landing/landingSlice';
import { productSlice } from './src/components/products/productSlice';
import { productCardSlice } from './src/components/order/productCardSlice';
import { userSlice } from './src/components/user/userSlice';
import { loadingAlertSlice } from './src/components/notifications/loadingAlertSlice'

const store = configureStore({
    reducer: {
        categories: landingSlice.reducer,
        products: productSlice.reducer,
        productCard: productCardSlice.reducer,
        user: userSlice.reducer,
        loadingAlert: loadingAlertSlice.reducer
    }
})

export default store