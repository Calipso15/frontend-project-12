/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const newChannelSlice = createSlice({
  name: 'newChannel',
  initialState: { name: '' },
  reducers: {
    resetNewChannelName: () => ({ name: '' }),
  },
});

export const { resetNewChannelName } = newChannelSlice.actions;

export default newChannelSlice.reducer;
