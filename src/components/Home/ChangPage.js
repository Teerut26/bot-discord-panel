import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Server from "./Server";
import ServerLists from "./ServerLists";
let _ = require("lodash");
function ChangPage(props) {
  const [state, setState] = useState(null)
  useEffect(() => {
    setState(props)
  }, [props])
  return (
    <div>
      {state !== null && state.PageManage.isDetail ? (
        <Server guilds={_.sortBy(state.guilds, [
          function (o) {
            return o.member_count;
          },
        ])} />
      ) : state !== null ? state.guilds.length > 0 ? (
        <ServerLists
          guilds={_.sortBy(state.guilds, [
            function (o) {
              return o.member_count;
            },
          ])}
        />
      ) : (
        ""
      ) : ""}
    </div>
  );
}

export default connect((state) => {
  return state;
})(ChangPage);
