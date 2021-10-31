import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

function SeverList(props) {
  const [Show, setShow] = useState(false);

  return (
    <div className="bg-dark border-0 p-3 flex gap-2">
      <div className="flex flex-row gap-3">
        <img
          className=" rounded-full w-16 h-16"
          src={
            props.item.icon
              ? `https://cdn.discordapp.com/icons/${props.item.id}/${props.item.icon}.png`
              : `https://ui-avatars.com/api/?name=${props.item.name}`
          }
        />
        <div>
          <h5 className="card-title">{props.item.name}</h5>
          <div className="my-2 flex flex-col">
            <div className="">Channels : {props.item.channels.length}</div>
            <div className="">
              Members : {props.item.presences.length}/{props.item.member_count}
            </div>
            <div className="">Region : {props.item.region}</div>
          </div>
          <div
            onClick={() => {
              // setShow(!Show)
              props.dispatch({ type: "SET_ID", playload: props.item.id });
            }}
            className="btn btn-sm btn-primary rounded-0"
          >
            View Channal
          </div>
          {Show ? (
            <div className="my-2 flex flex-col gap-1">
              {props.item.presences.map((item2) => (
                <Text item2={item2} />
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default connect((state) => {
  return state;
})(SeverList);

const Text = ({ item2 }) => {
  const [url, setUrl] = useState(null);
  const [data, setData] = useState(null);
  useEffect(() => {
    getData();
    // console.log(item2);
  }, [item2]);
  const getData = async () => {
    let config = {
      method: "get",
      url: "https://discordapp.com/api/v7/users/" + item2.user.id,
      headers: {
        authorization: "Bot " + localStorage.getItem("TOKEN"),
      },
    };
    let res = await axios(config);
    let data = await res.data;
    setData(data);
    setUrl(`https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`);
  };
  return (
    <div className="flex flex-row gap-1">
      <img
        className="rounded-full w-6 h-6"
        src={
          url !== null ? url : `https://ui-avatars.com/api/?name=${item2.id}`
        }
      />
      <div>
        {data !== null ? data.username : ""} {item2.status}
      </div>
    </div>
  );
};
