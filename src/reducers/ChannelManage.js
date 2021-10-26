let initialState = {
  channel_name: null,
  channel_messages: null,
  channel_id: null,
  guild: null,
  guild_id: null,
};

const ChannelManage = (state = initialState, action) => {
  switch (action.type) {
    case "SELLECT_CHANNEL":
      return {
        channel_name: action.playload.channel_name,
        channel_messages: action.playload.channel_messages,
        channel_id: action.playload.channel_id,
        guild_id: action.playload.guild_id,
      };
    case "CLEAR_CHANNEL":
      return {
        channel_name: null,
        channel_messages: null,
        channel_id: null,
        guild_id: null,
      };
    case "ADD_MESSAGE":
      return {
        channel_name: action.playload.channel_name,
        channel_messages: action.playload.channel_messages,
        channel_id: action.playload.channel_id,
        guild_id: action.playload.guild_id,
      };
    default:
      return state;
  }
};

export { ChannelManage };
