import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function TokenCheck() {
  let history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("TOKEN") === null) {
      history.push("/login");
    }
  }, [history]);
  return <></>;
}
