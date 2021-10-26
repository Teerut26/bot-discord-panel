let initialState = localStorage.getItem("TOKEN");

const TokenManage = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      localStorage.setItem("TOKEN", action.playload);
      return localStorage.getItem("TOKEN");
    case "REMOVE_TOKEN":
      localStorage.removeItem("TOKEN");
    default:
      return localStorage.getItem("TOKEN") === null
        ? null
        : localStorage.getItem("TOKEN");
  }
};

export { TokenManage };
