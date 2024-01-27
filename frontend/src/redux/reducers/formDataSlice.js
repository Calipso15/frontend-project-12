/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const formDataSlice = createSlice({
  name: 'formData',
  initialState: {
    message: '',
  },
  reducers: {
    updateMessage: (state, action) => {
      state.message = action.payload;
    },
    resetMessage: (state) => {
      state.message = '';
    },
  },
});

export const { updateMessage, resetMessage } = formDataSlice.actions;

export default formDataSlice.reducer;
