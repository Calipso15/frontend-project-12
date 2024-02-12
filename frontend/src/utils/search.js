const getChannelNameById = (channels, channelId) => {
  const channel = channels.find((ch) => ch.id === channelId);
  return channel ? channel.name : '';
};



export default getChannelNameById;
