import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
class Channel extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  Symbol(key) {
    switch (key) {
      case 0:
        return "#";
      case 2:
        return "🔊";
      case 4:
        return "️⬇️";
      default:
        return " ";
    }
  }

  async onSelect(item) {
    let config = {
      method: "get",
      url: `https://discordapp.com/api/v9/channels/${item.id}/messages?limit=50`,
      headers: {
        authorization: "Bot " + localStorage.getItem("TOKEN"),
      },
    };
    let res = await axios(config);
    let data = await res.data;
    this.props.dispatch({
      type: "SELLECT_CHANNEL",
      playload: {
        channel_name: item.name,
        channel_messages: data,
        channel_id: item.id,
        guild_id: this.props.lists.id,
      },
    });
  }

  render() {
    return (
      <div className="bg-dark text-light w-full">
        <div className="my-2 px-3 font-bold text-lg flex flex-row align-items-center gap-2">
          <div>
            <img
              className="rounded-full w-10 h-10"
              src={
                this.props.lists.icon
                  ? `https://cdn.discordapp.com/icons/${this.props.lists.id}/${this.props.lists.icon}.png`
                  : `https://ui-avatars.com/api/?name=${this.props.lists.name}`
              }
            />
          </div>
          <div>{this.props.lists.name}</div>
        </div>

        <div
          style={{ height: "82vh" }}
          className="flex flex-col gap-2 overflow-auto px-3"
        >
          {this.props.lists.channels.map((item) =>
            item.type == 0 ? (
              <div
                className={
                  this.props.ChannelManage.channel_id !== null &&
                  this.props.ChannelManage.channel_id === item.id
                    ? "select-channel"
                    : "text-gray-400"
                }
                onClick={() => this.onSelect(item)}
              >
                {this.Symbol(item.type)}
                {item.name}
              </div>
            ) : (
              ""
            )
          )}
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  return state;
})(Channel);
