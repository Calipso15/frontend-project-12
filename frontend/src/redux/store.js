import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './reducers/channelsSlice';
import messagesReducer from './reducers/messagesSlice';
import newChannelReducer from './reducers/newChannelSlice';
import modalReducer from './reducers/modalSlice';
import formDataReducer from './reducers/formDataSlice';
import selectedChannelReducer from './reducers/selectedChannelSlice';

const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    newChannel: newChannelReducer,
    modal: modalReducer,
    formData: formDataReducer,
    selectedChannel: selectedChannelReducer,
  },
});

export default store;
