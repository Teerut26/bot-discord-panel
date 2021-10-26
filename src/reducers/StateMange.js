let initialState = null;

const StateMange = (state = initialState, action) => {
  switch (action.type) {
    case "SET_STATE":
      return action.playload;
    case "CLEAR":
      return null;
    default:
      return state;
  }
};

export { StateMange };
