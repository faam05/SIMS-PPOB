import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getServices = createAsyncThunk('services', async () => {
    const response = await axios.get('https://take-home-test-api.nutech-integrasi.app/services', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data.data;
});

const initialState = {
    services: [],
};

const servicesSlice = createSlice({
    name: 'services',
    initialState,
    extraReducers: {
        [getServices.fulfilled]: (state, action) => {
            state.services = action.payload;
        },
        [getServices.rejected]: (state) => {
            state.services = 0;
        },
    },
});

export default servicesSlice.reducer;
