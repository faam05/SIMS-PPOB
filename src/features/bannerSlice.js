import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getBanners = createAsyncThunk('banners', async () => {
    const response = await axios.get('https://take-home-test-api.nutech-integrasi.app/banner', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data.data;
});

const initialState = {
    banners: [],
};

const bannersSlice = createSlice({
    name: 'banners',
    initialState,
    extraReducers: {
        [getBanners.fulfilled]: (state, action) => {
            state.banners = action.payload;
        },
        [getBanners.rejected]: (state) => {
            state.banners = 0;
        },
    },
});

export default bannersSlice.reducer;
