import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import logger from "redux-logger";

import rootReducer from '../store/reducers/index';

//создаем наше внутреннее хранилище и подключаем к нему либу для работы с асинхронным кодом, так как редакс по своей сути синхронный
const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, logger]
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch