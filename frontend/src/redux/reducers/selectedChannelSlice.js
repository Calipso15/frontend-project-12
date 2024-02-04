/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedChannelMenu: null,
};

const selectedChannelSlice = createSlice({
  name: 'selectedChannel',
  initialState,
  reducers: {
    addSelectedChannel: (state, action) => {
      state.selectedChannelMenu = action.payload;
    },
  },
});

export const { addSelectedChannel } = selectedChannelSlice.actions;

export default selectedChannelSlice.reducer;
