import {ACTIONS} from "../../utils/constants";

type initialState = {
  isReady: boolean,
  role: number,
  email: string,
}

const initialState: initialState = {
  isReady: false,
  role: 0,
  email: "",
};

const userReducer = (state = initialState, action: { type: string; payload: any; }) => {
  switch (action.type) {
    //сетим юзера
    case ACTIONS.USER.SET_USER: {
      return {
        ...state,
        role: action.payload.role,
        email: action.payload.email,
        isReady: true
      };
    }
    //сетим готовность данные юзера (булеан)
    case ACTIONS.USER.SET_READY_USER:
      return {
        ...state,
        isReady: action.payload
      };

    default:
      return state;
  }
};

export default userReducer;
