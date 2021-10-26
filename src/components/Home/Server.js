import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Channel from "./Server/Channel";
import Chat from "./Server/Chat";
import OnlineLists from "./Server/OnlineLists";
var _ = require("lodash");

function Server(props) {
  const [Guild, setGuild] = useState(null);
  useEffect(() => {
    let guild = _.find(props.guilds, { id: props.PageManage.id });
    setGuild(guild);
  }, [props]);

  if (Guild === null) {
    return <></>;
  }

  return (
    <div class="grid grid-cols-1 md:grid-cols-6 gap-2 mt-2 mx-1 ">
      <Channel lists={Guild} />
      <Chat lists={Guild} />
      <OnlineLists lists={Guild} />
    </div>
  );
}

export default connect((state) => {
  return state;
})(Server);
