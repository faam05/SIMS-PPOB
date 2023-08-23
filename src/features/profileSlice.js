import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProfile = createAsyncThunk('profile', async () => {
    const response = await axios.get('https://take-home-test-api.nutech-integrasi.app/profile', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data.data;
});

const initialState = {
    email: '',
    first_name: '',
    last_name: '',
    profile_image: '',
    auth: '',
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    extraReducers: {
        [getProfile.fulfilled]: (state, action) => {
            state.email = action.payload.email;
            state.first_name = action.payload.first_name;
            state.last_name = action.payload.last_name;
            state.profile_image = action.payload.profile_image;
            state.auth = true;
        },
        [getProfile.rejected]: (state) => {
            state.email = '';
            state.first_name = '';
            state.last_name = '';
            state.profile_image = '';
            state.auth = false;
        },
    },
});

export default profileSlice.reducer;
