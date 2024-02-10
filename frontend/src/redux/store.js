import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './reducers/channelsSlice';
import messagesReducer from './reducers/messagesSlice';
import modalReducer from './reducers/modalSlice';
import formDataReducer from './reducers/formDataSlice';
import selectedChannelReducer from './reducers/selectedChannelSlice';

const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modal: modalReducer,
    formData: formDataReducer,
    selectedChannel: selectedChannelReducer,
  },
});

export default store;
