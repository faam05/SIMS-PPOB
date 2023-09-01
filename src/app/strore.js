import { configureStore } from '@reduxjs/toolkit';
import profileReducer from '../features/profileSlice';
import balanceReducer from '../features/balanceSlice';
import transaksiReducer from '../features/transaksiSlice';
import servicesReducer from '../features/servicesSlice';
import bannerReducer from '../features/bannerSlice';

const store = configureStore({
    reducer: {
        profile: profileReducer,
        balance: balanceReducer,
        transaksi: transaksiReducer,
        services: servicesReducer,
        banners: bannerReducer,
    },
    devTools: false,
});

export default store;
