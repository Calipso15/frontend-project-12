/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isModalOpen: false,
    modalType: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.modalType = action.payload;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.modalType = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
