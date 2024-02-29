/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { deleteChannel } from './channelsSlice';

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    setMessage: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteChannel, (state, action) => {
      const channelId = action.payload;
      state.messages = state.messages.filter((message) => message.channelId !== channelId);
    });
  },
});

export const { addMessage, setMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
