import {ACTIONS} from "../../utils/constants";

type initialState = {
  isReady: boolean,
  role: number,
  email: string,
  id: number,
  phone_number: string,
}

const initialState: initialState = {
  isReady: false,
  role: 0,
  email: "",
  id: -1,
  phone_number: ""
};

const userReducer = (state = initialState, action: { type: string; payload: any; }) => {
  switch (action.type) {
    //сетим юзера
    case ACTIONS.USER.SET_USER: {
      return {
        ...state,
        id: action.payload.id,
        role: action.payload.role,
        email: action.payload.email,
        isReady: true
      };
    }
    case ACTIONS.USER.SET_USER_INFO: {
      return {
        ...state,
        phone_number: action.payload.phone_number,
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
