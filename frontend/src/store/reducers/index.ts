import {combineReducers} from 'redux';

import user from "./userReducer";

const appReducer = combineReducers({
  user,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "LOG_OUT") {
    localStorage.removeItem('token');
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
