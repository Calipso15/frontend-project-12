
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  visible: false,
  type: null,
  id: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal(state, action) {
      state.visible = true;
      state.type = action.payload.type;
      state.id = action.payload.itemId;
    },
    hideModal(state) {
      state.visible = false;
      state.type = null;
      state.id = null;
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
