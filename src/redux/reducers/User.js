let initialState = {
  isLoggedIn: false,
  displayname: "",
  email: "",
};

const User = (state = initialState, action) => {
  switch (action.type) {
    case "USER":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default User;
