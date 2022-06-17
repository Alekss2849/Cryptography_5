import React from 'react';
import {createRoot} from "react-dom/client";
import createdStore from './store/store';

import './index.css';
import App from "./components/App";
import {Provider} from "react-redux";

const store = createdStore;

const container = document.getElementById('root')!;

const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App/>
  </Provider>
);