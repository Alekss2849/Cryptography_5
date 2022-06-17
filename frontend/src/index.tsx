import React from 'react';
import {createRoot} from "react-dom/client";
import createdStore from './store/store';

import './index.css';
import App from "./components/App";
import {Provider} from "react-redux";

const store = createdStore;

const container = document.getElementById('root')!;

const root = createRoot(container);
//к созданному ДОМ дереву из public/index.html мы дорисовываем ShadowDOM от Реакта
//также в провайдер прокидываем своей внутренне хранилище приложения
root.render(
  <Provider store={store}>
    <App/>
  </Provider>
);