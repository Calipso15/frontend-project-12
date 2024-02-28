/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  type: null,
  channelId: null,
};

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      const { type, id } = payload;
      state.isOpen = true;
      state.type = type;
      state.channelId = id ?? null;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = null;
      state.channelId = null;
    },
  },

});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
