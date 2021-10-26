import { combineReducers } from "redux";
import { createStore } from "redux";

import { TokenManage } from "./TokenManage";
import { PageManage } from "./PageManage";
import { StateMange } from "./StateMange";
import { ChannelManage } from "./ChannelManage";


const reducer = combineReducers({
  TokenManage,
  PageManage,
  StateMange,
  ChannelManage
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export { store };
