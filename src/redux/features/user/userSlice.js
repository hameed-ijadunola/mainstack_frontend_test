import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pushToken: '',
  initialLoad: true,
  toastMessage: null,
  toastType: null,
  toastDuration: 4000,
};

export const userSlice = createSlice({
  name: 'userStore',
  initialState,
  reducers: {
    saveInitiaLoad: (state, { payload }) => {
      state.initialLoad = 'true';
    },
    clearInitialLoad: (state, { payload }) => {
      state.initialLoad = '';
    },
    saveToUserStore: (state, { payload }) => {
      state[payload?.key] = payload.value;
    },
    saveToStore: (state, { payload }) => {
      state[payload[0]] = payload[1];
    },
    clearUserDetails: (state, { payload }) => {
      state = {};
    },
  },
});

export const {
  saveToUserStore,
  saveToStore,
  clearUserDetails,
  saveInitiaLoad,
  clearInitialLoad,
} = userSlice.actions;

export default userSlice.reducer;
