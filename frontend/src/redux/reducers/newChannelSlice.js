/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const newChannelSlice = createSlice({
  name: 'newChannel',
  initialState: { name: '' },
  reducers: {
    updateNewChannelName: (state, action) => {
      state.name = action.payload;
    },
    resetNewChannelName: () => ({ name: '' }),
  },
});

export const { updateNewChannelName, resetNewChannelName } = newChannelSlice.actions;

export default newChannelSlice.reducer;
