const scrollToBottom = () => {
  const messagesBox = document.getElementById('messages-box');
  if (messagesBox) {
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }
};

export default scrollToBottom;
