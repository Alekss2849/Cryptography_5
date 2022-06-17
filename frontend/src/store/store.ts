import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import logger from "redux-logger";

import rootReducer from '../store/reducers/index';

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, logger]
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch