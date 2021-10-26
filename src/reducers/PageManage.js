let initialState = { isDetail: false, id: null };

const PageManage = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ID":
      return { isDetail: true, id: action.playload };
    case "BACK":
      return { isDetail: false, id: null };
    default:
      return state;
  }
};

export { PageManage };
