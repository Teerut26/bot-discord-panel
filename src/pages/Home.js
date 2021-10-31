import React, { Component } from "react";
// import Navbar from "../components/Home/Navbar";
// import ServerLists from "../components/Home/ServerLists";
import { config } from "../components/config";
import { connect } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Server from "../components/Home/Server";
import ChangPage from "../components/Home/ChangPage";

var wss = new WebSocket(config.WSS_URL);
let _ = require("lodash");
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuth: false,
      guilds: [],
      isDetail: null,
    };
  }

  notify = () =>
    toast.success("🦄 Wow so easy!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  sendWssAuth() {
    wss.send(
      JSON.stringify({
        op: 2,
        d: {
          large_threshold: 250,
          compress: false,
          properties: {
            $os: "browser",
            $browser: "discord.js",
            $device: "discord.js",
          },
          version: 6,
          presence: {
            afk: false,
            since: null,
            status: "online",
            game: null,
          },
          token: localStorage.getItem("TOKEN"),
          shard: [0, 1],
        },
      })
    );
  }

  componentDidUpdate() {
    this.props.dispatch({
      type: "SET_STATE",
      playload: this.state.guilds,
    });
  }

  componentDidMount() {
    wss.onopen = function (event) {
      wss.send(
        JSON.stringify({
          op: 2,
          d: {
            large_threshold: 250,
            compress: false,
            properties: {
              $os: "browser",
              $browser: "discord.js",
              $device: "discord.js",
            },
            version: 6,
            presence: {
              afk: false,
              since: null,
              status: "online",
              game: null,
            },
            token: localStorage.getItem("TOKEN"),
            shard: [0, 1],
          },
        })
      );
      setInterval(() => {
        wss.send(JSON.stringify({ op: 1, d: 3 }));
      }, 10000);
    };

    wss.onmessage = (e) => {
      let data = JSON.parse(e.data);
      // console.log(data);
      if (data.t === "GUILD_CREATE") {
        // console.log(data.d);
        this.setState((prevState) => {
          return {
            guilds: [...prevState.guilds, data.d],
          };
        });
      }

      this.PRESENCE(data);
      this.MESSAGE_CREATE(data);
    };
  }

  MESSAGE_CREATE(data) {
    if (data.t === "MESSAGE_CREATE") {
      if (this.props.ChannelManage.channel_messages === null) return;
      if (this.props.ChannelManage.guild_id !== data.d.guild_id) return;
      let guild = this.state.guilds.filter((item) =>
        _.find(item.channels, { id: data.d.channel_id })
      )[0];
      // console.log(guild.name);
      toast(
        `${data.d.author.username}: "${data.d.content}" in #${
          _.find(guild.channels, { id: data.d.channel_id }).name
        } ${guild.name}`,
        {
          position: "top-center",
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      if (data.d.channel_id !== this.props.ChannelManage.channel_id) return;
      this.props.dispatch({
        type: "ADD_MESSAGE",
        playload: {
          channel_name: this.props.ChannelManage.channel_name,
          channel_messages: [
            data.d,
            ...this.props.ChannelManage.channel_messages,
          ],
          channel_id: this.props.ChannelManage.channel_id,
          guild_id: this.props.ChannelManage.guild_id,
        },
      });
    }
  }

  PRESENCE(data) {
    if (data.t === "PRESENCE_UPDATE") {
      let res = this.state.guilds.filter(
        (item) => item.id === data.d.guild_id
      )[0];
      let res2 = res.presences.filter(
        (item) => item.user.id === data.d.user.id
      );
      if (res2.length === 0) {
        let sdfkk = _.find(res, { user: { id: data.d.user.id } });
        console.log(sdfkk);
        if (data.d.status == "online") {
          toast.success(
            `${data.d.user.username} ${data.d.status} in ${res.name}`,
            {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        } else {
          toast.info(
            `${data.d.user.username} ${data.d.status} in ${res.name}`,
            {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        }

        res.presences.push({
          activities: data.d.activities,
          client_status: data.d.client_status,
          game: data.d.game,
          status: data.d.status,
          user: data.d.user,
        });
        let result = this.state.guilds.filter((item) => item.id !== res.id);
        result.push(res);
        this.setState({ guilds: result });
        //   console.log(this.state.guilds);
      } else {
        if (data.d.status === "offline") {
          let sdfkk = _.find(res.members, { user: { id: data.d.user.id } });
          toast.error(`${sdfkk.user.username} offline in ${res.name}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          let result = res.presences.filter(
            (item) => item.user.id !== data.d.user.id
          );
          res.presences = result;
          let result2 = this.state.guilds.filter((item) => item.id !== res.id);
          result2.push(res);
          this.setState({ guilds: result2 });
          console.log("remove");
        } else {
          let sdfkk = _.find(res.members, { user: { id: data.d.user.id } });
          if (data.d.status !== "online" && data.d.status !== "offline") {
            toast.info(
              `${sdfkk.user.username} ${data.d.status} in ${res.name}`,
              {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
          }

          let result = res.presences.filter(
            (item) => item.user.id !== res2[0].user.id
          );
          result.push({
            activities: data.d.activities,
            client_status: data.d.client_status,
            game: data.d.game,
            status: data.d.status,
            user: data.d.user,
          });
          res.presences = result;
          let result2 = this.state.guilds.filter((item) => item.id !== res.id);
          result2.push(res);
          this.setState({ guilds: result2 });
          console.log("update");
        }
      }
    }
  }

  componentWillUnmount() {
    wss.close();
  }

  render() {
    return (
      <>
        <ToastContainer />
        <ChangPage guilds={this.state.guilds} />
      </>
    );
  }
}

export default connect((state) => {
  return state;
})(Home);
