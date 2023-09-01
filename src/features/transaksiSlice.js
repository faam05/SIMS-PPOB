import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTransaksi = createAsyncThunk('transaksi', async (value = 0) => {
    const response = await axios.get(`https://take-home-test-api.nutech-integrasi.app/transaction/history?offset=${value}&limit=5`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data.data.records;
});

export const saveTransaksi = createAsyncThunk('transaksi/bayar', async (value) => {
    const response = await axios.post('https://take-home-test-api.nutech-integrasi.app/transaction', value, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data.data;
});

const transaksiEntity = createEntityAdapter({
    selectId: (transaksi) => transaksi.invoice_number,
    nextPage: null,
});

const transaksiSlice = createSlice({
    name: 'transaksi',
    initialState: transaksiEntity.getInitialState(),
    extraReducers: {
        [saveTransaksi.fulfilled]: (state, action) => {
            transaksiEntity.addOne(state, action.payload);
        },
        [getTransaksi.fulfilled]: (state, action) => {
            // transaksiEntity.setAll(state, action.payload);
            transaksiEntity.addMany(state, action.payload);
            state.nextPage = action.payload.length < 5 ? false : true;
        },
    },
});

export const TransaksiSelectors = transaksiEntity.getSelectors((state) => state.transaksi);
export default transaksiSlice.reducer;
