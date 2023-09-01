import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getBalance = createAsyncThunk('balance', async () => {
    const response = await axios.get('https://take-home-test-api.nutech-integrasi.app/balance', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data.data;
});

export const addBalance = createAsyncThunk('topup', async (value) => {
    const response = await axios.post(
        'https://take-home-test-api.nutech-integrasi.app/topup',
        {
            top_up_amount: value ? value : 0,
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }
    );
    return response.data.data;
});

const initialState = {
    balance: 0,
    status: null,
};

const balanceSlice = createSlice({
    name: 'balance',
    initialState,
    extraReducers: {
        [getBalance.fulfilled]: (state, action) => {
            state.balance = action.payload.balance;
        },
        [getBalance.rejected]: (state) => {
            state.balance = 0;
        },
        [addBalance.fulfilled]: (state, action) => {
            state.balance = action.payload.balance;
            state.status = 'success';
        },
        [addBalance.rejected]: (state) => {
            state.balance;
            state.status = 'failed';
        },
    },
});

export default balanceSlice.reducer;
