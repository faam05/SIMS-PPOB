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

export const getTransaksi = createAsyncThunk('transaksi', async (value = 0) => {
    const response = await axios.get(`https://take-home-test-api.nutech-integrasi.app/transaction/history?offset=${value}&limit=5`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data.data;
});

export const saveTransaksi = createAsyncThunk('transaksi/bayar', async (value) => {
    const response = await axios.post('https://take-home-test-api.nutech-integrasi.app/transaction', value, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data.data;
});

const initialState = {
    balance: 0,
    status: null,
    transaksi: null,
    nextPage: null,
    loading: null,
};

const balanceSlice = createSlice({
    name: 'balance',
    initialState,
    extraReducers: {
        [getBalance.fulfilled]: (state, action) => {
            state.balance = action.payload.balance;
            state.transaksi = null;
        },
        [getBalance.rejected]: (state) => {
            state.balance = 0;
        },
        [addBalance.fulfilled]: (state, action) => {
            state.balance = action.payload.balance;
            state.status = 'success';
            state.transaksi = null;
        },
        [addBalance.rejected]: (state) => {
            state.balance;
            state.status = 'failed';
        },
        [saveTransaksi.fulfilled]: (state, action) => {
            state.balance = state.balance - action.payload.total_amount;
            state.status = 'success';
            state.transaksi = null;
        },
        [saveTransaksi.rejected]: (state) => {
            state.balance;
            state.status = 'failed';
        },
        [getTransaksi.fulfilled]: (state, action) => {
            state.transaksi = state.transaksi ? [...state.transaksi, ...action.payload.records] : action.payload.records;
            state.status = 'success';
            state.nextPage = action.payload.records.length < 5 ? false : true;
            state.loading = false;
        },
        [getTransaksi.rejected]: (state) => {
            state.status = 'failed';
            state.loading = false;
        },
    },
});

export default balanceSlice.reducer;
