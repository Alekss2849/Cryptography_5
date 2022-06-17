import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {ToastContainer} from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

import Header from "./header/Header";
import AppRouter from "./AppRouter";
import Footer from "./footer/Footer";

const App = () => {
  return (
    <div>
      <div className="content">
        <Router>
          <Header/>
          <AppRouter/>
        </Router>
      </div>
      <Footer/>
      <ToastContainer/>
    </div>
  );
};
export default App;