import { UserActionsType } from "./../types";
import { userInfoType } from "../types";

export const initialUserState: userInfoType = {
  nickname: null,
  avatar: null,
  score: 0,
  firstLogin: 0,
  uid: null,
  id: undefined,
  isLoaded: false,
  key: "",
  skin: {
    type: "standard",
    withBorder: true,
    borderColor: "lime-600",
    borderStyle: "solid",
    borderWidth: 2,
    color: "orange-300",
  },
  banned: false,
  isLeft: false,
};

export const userReducer = (
  state = initialUserState,
  action: UserActionsType
): userInfoType => {
  switch (action.type) {
    case "USER_SET": {
      return { ...state, ...action.payload };
    }
    case "USER_SET_ID": {
      return { ...state, id: action.payload };
    }
    case "USER_SET_LOADING": {
      return { ...state, isLoaded: action.payload };
    }
    case "USER_SET_LEFT": {
      return {...state, isLeft: action.payload}
    }
    case "USER_SET_SKIN": {
      return { ...state, skin: action.payload };
    }
    case "USER_SET_SCORE": {
      return { ...state, score: action.payload };
    }
    default: {
      return { ...state };
    }
  }
};

export default userReducer;
