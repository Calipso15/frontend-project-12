/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    selectedChannelId: null,
  },
  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload;
    },
    addChannel: (state, action) => {
      state.channels = [...state.channels, action.payload];
    },
    deleteChannel: (state, action) => {
      state.channels = state.channels.filter((channel) => channel.id !== action.payload);
    },
    renameChannel: (state, action) => {
      state.channels = state.channels.map((ch) => (ch.id === action.payload.id
        ? { ...ch, name: action.payload.name } : ch));
    },
    selectChannel: (state, action) => {
      state.selectedChannelId = action.payload;
    },
  },
});

export const {
  setChannels, addChannel, deleteChannel, renameChannel, selectChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
