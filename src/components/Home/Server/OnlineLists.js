import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
let _ = require("lodash");

function OnlineLists(props) {
  const [Member, setMember] = useState(null);
  const [MemberOffline, setMemberOffline] = useState(null);
  useEffect(() => {
    let obj = [];
    let offLine = [];
    //check user online
    props.lists.presences.map((item) => {
      obj.push(
        _.assign(_.find(props.lists.members, { user: { id: item.user.id } }), {
          activitie: item.activities.length > 0 ? item.activities[0] : null,
          status: item.status,
        })
      );
    });
    //check user offline
    props.lists.members.map((item) => {
      if (!_.some(obj, { user: { id: item.user.id } })) {
        offLine.push(item);
      }
    });
    setMemberOffline(offLine);
    setMember(obj);
  }, [props]);
  return (
    <div className="bg-dark text-light w-full p-2 ">
      <div className="my-2 px-2 font-bold text-sm flex flex-row align-items-center gap-2">
        {Member !== null ? (
          <div>
            {Member.length}/{props.lists.member_count} Members
          </div>
        ) : (
          ""
        )}
      </div>
      <div
        style={{ height: "83vh" }}
        className="flex flex-col gap-2 overflow-auto "
      >
        {Member !== null
          ? Member.map((item) =>
              item.user.bot ? <TextBot item2={item} /> : <></>
            )
          : ""}

        {Member !== null && Member.length > 0 ? (
          <>
            <hr />
            {Member.map((item) =>
              !item.user.bot ? <TextUser item2={item} /> : <></>
            )}
          </>
        ) : (
          ""
        )}
        {MemberOffline !== null && MemberOffline.length > 0 ? (
          <>
            <hr />
            {MemberOffline.map((item) =>
              !item.user.bot ? <TextOffline item2={item} /> : <></>
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default connect((state) => {
  return state;
})(OnlineLists);

const statusCheck = (status) => {
  switch (status) {
    case "idle":
      return <div className=" rounded-full bg-warning w-2 h-2"></div>;
    case "dnd":
      return <div className=" rounded-full bg-danger w-2 h-2"></div>;
    case "online":
      return <div className=" rounded-full bg-success w-2 h-2"></div>;
    default:
      return <></>;
  }
};

const TextUser = (props) => {
  const [url, setUrl] = useState(
    props.item2.user.avatar !== null
      ? `https://cdn.discordapp.com/avatars/${props.item2.user.id}/${props.item2.user.avatar}.png`
      : "/discord_defaults_avatars/0.png"
  );

  return (
    <div className="flex flex-row align-items-center gap-2">
      <div className="relative">
        <img className="rounded-full w-8 h-8" src={url} />
      </div>
      <div className="flex flex-col ">
        <div className="flex flex-row align-items-center gap-1 truncate text-sm font-bold ">
          {statusCheck(props.item2.status)}
          {props.item2.user.username} {props.item2.user.status}
        </div>
        <div className="truncate text-xs text-gray-400">
          {props.item2.activitie !== null ? props.item2.activitie.name : ""}
        </div>
      </div>
    </div>
  );
};

const TextBot = (props) => {
  const [url, setUrl] = useState(
    props.item2.user.avatar !== null
      ? `https://cdn.discordapp.com/avatars/${props.item2.user.id}/${props.item2.user.avatar}.png`
      : "/discord_defaults_avatars/0.png"
  );

  return (
    <div className="flex flex-row align-items-center gap-2">
      <img className="rounded-full w-8 h-8" src={url} />
      <div className="flex flex-col ">
        <div className="flex flex-row align-items-center gap-1 truncate text-sm font-bold ">
          {statusCheck(props.item2.status)}
          {props.item2.user.username} {props.item2.user.status}
        </div>
        <div className="truncate text-xs text-gray-400">
          {props.item2.activitie !== null ? props.item2.activitie.name : ""}
        </div>
      </div>
    </div>
  );
};

const TextOffline = (props) => {
  const [url, setUrl] = useState(
    props.item2.user.avatar !== null
      ? `https://cdn.discordapp.com/avatars/${props.item2.user.id}/${props.item2.user.avatar}.png`
      : "/discord_defaults_avatars/0.png"
  );

  return (
    <div className="flex flex-row align-items-center gap-2">
      <img
        style={{ filter: "brightness(43%)" }}
        className="rounded-full w-8 h-8"
        src={url}
      />
      <div className="flex flex-col">
        <div
          style={{ filter: "brightness(43%)" }}
          className="truncate text-sm font-bold"
        >
          {props.item2.user.username} {props.item2.user.status}
        </div>
      </div>
    </div>
  );
};
