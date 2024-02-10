/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
    selectedChannelId: null,
  },
  reducers: {
    setMessage: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
  },
});

export const { addMessage, setMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
