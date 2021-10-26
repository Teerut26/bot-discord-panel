import ScrollableFeed from "react-scrollable-feed";
import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
let _ = require("lodash");

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
    };
  }

  sendMessage() {
    if (this.state.message.length === 0) return;
    var data = JSON.stringify({
      content: this.state.message,
      tts: false,
      embeds: [],
    });

    var config = {
      method: "post",
      url: `https://discordapp.com/api/v7/channels/${this.props.ChannelManage.channel_id}/messages`,
      headers: {
        authorization: "Bot " + localStorage.getItem("TOKEN"),
        "content-type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState({ message: "" });
  }

  ContentFilter(obj) {
    try {
      if (obj.content.length > 0) {
        return <>{obj.content}</>;
      } else if (obj.attachments.length > 0) {
        if (obj.attachments[0].content_type.match("image")) {
          return (
            <>
              <img width="384px" src={obj.attachments[0].proxy_url} />
            </>
          );
        }
        return <></>;
      }
    } catch (error) {
      return <></>;
    }
  }

  coverTime(item){
    let now = new Date(item);
    return `${now.toLocaleDateString("th-TH")} ${now.toLocaleTimeString("th-TH")}`
  }

  render() {
    return (
      <div className="bg-dark text-light w-full col-start-2 col-span-4 p-2 ">
        {this.props.ChannelManage.channel_id !== null &&
        this.props.ChannelManage.channel_messages !== null ? (
          <>
            <div className="mb-2 font-bold">
              #{this.props.ChannelManage.channel_name}
            </div>
            <div style={{ height: "78vh" }} className="overflow-auto">
              <ScrollableFeed>
                {_.reverse(this.props.ChannelManage.channel_messages).map(
                  (item) => (
                    <div className="flex gap-2 align-items-start p-2 ">
                      <img
                        className="rounded-full w-11 h-11"
                        src={
                          item.author.avatar !== null
                            ? `https://cdn.discordapp.com/avatars/${item.author.id}/${item.author.avatar}.png`
                            : "/discord_defaults_avatars/0.png"
                        }
                      />
                      <div className="flex flex-col">
                        <div className="flex gap-2 align-items-center">
                          <div>{item.author.username}</div>
                          <div className="text-xs text-gray-400">{this.coverTime(item.timestamp)}</div>
                          
                        </div>
                        <div>
                          <div className="truncate w-96">
                            {this.ContentFilter(item)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </ScrollableFeed>
            </div>
            <div class="input-group">
              <input
                onKeyDown={(e) => (e.key === "Enter" ? this.sendMessage() : "")}
                type="text"
                value={this.state.message}
                onChange={(v) =>
                  this.setState({
                    message: v.target.value,
                  })
                }
                class="form-control bg-dark text-light rounded-0 shadow-sm"
                placeholder={`ส่งข้อความถึง #${this.props.ChannelManage.channel_name}`}
              />
              <div onClick={() => this.sendMessage()} class="btn btn-success">
                <i class="fas fa-paper-plane"></i>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default connect((state) => {
  return state;
})(Chat);
