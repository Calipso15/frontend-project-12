/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import channelSlice from './channelsSlice';

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
    builder.addCase(channelSlice.actions.deleteChannel, (state, action) => {
      state.messages = state.messages.filter((message) => message.channelId !== action.payload);
    });
  },
});

export const { addMessage, setMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
