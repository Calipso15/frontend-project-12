/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
    selectedChannelId: null,
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
