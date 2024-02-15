import { io } from 'socket.io-client';
import store from './redux/store';
import { addMessage } from './redux/reducers/messagesSlice';
import { addChannel, deleteChannel, renameChannel } from './redux/reducers/channelsSlice';

const initSocket = () => {
  const socket = io('http://localhost:5001');

  socket.on('newMessage', (message) => {
    store.dispatch(addMessage(message));
  });

  socket.on('newChannel', (channel) => {
    store.dispatch(addChannel(channel));
  });

  socket.on('removeChannel', (data) => {
    const { id: channelId } = data;
    store.dispatch(deleteChannel(channelId));
  });

  socket.on('renameChannel', (data) => {
    const { id: channelId, name: cleanName } = data;
    store.dispatch(renameChannel({ name: cleanName, id: channelId }));
  });
};

export default initSocket;
