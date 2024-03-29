const getChannelNameById = (channels, channelId) => {
  const channel = channels.find((ch) => ch.id === channelId);
  return channel ? channel.name : '';
};

const getGeneralChannelId = (channels) => {
  const generalChannel = channels.find((channel) => channel.name === 'general');
  return generalChannel ? generalChannel.id : null;
};

export { getChannelNameById, getGeneralChannelId };
