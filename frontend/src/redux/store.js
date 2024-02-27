import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './reducers/channelsSlice';
import messagesReducer from './reducers/messagesSlice';
import modalReducer from './reducers/modalSlice';

const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modal: modalReducer,
  },
});

export default store;
