import React, { useEffect } from "react";
import SeverList from "./SeverList";
let _ = require("lodash");
export default function ServerLists(props) {
  
  return (
    <div class="p-3 grid grid-cols-1 md:grid-cols-3 gap-4 text-light">
      {props.guilds !== null
        ? props.guilds.map((item, index) => <SeverList click={(id)=>props.click(id)} item={item} key={index} />)
        : ""}
    </div>
  );
}
