import React from "react";

export default function UserLists({item}) {
  return (
    <div className="my-2 flex flex-col">
      {item.presences.map((item2) => (
        <div>
          {item2.user.id} {item2.status}
        </div>
      ))}
      <div className="">Channels : {item.channels.length}</div>
    </div>
  );
}
