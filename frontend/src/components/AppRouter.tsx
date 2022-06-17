import React, {useEffect} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";

import NotFound from "../http/components/404";

import {authAdminRoutes, guestRoutes} from "../utils/constants";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {checkToken} from "../store/actions/userActions";

const AppRouter = () => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('token');
  const role = useAppSelector((state) => state.user.role);
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      dispatch(checkToken(navigate));
    }
  }, []);

  return (
    <Routes>
      {role === 'ADMIN' && authAdminRoutes.map(({path, Component}) =>
        <Route path={path} element={Component} key={path}/>
      )}
      {guestRoutes.map(({path, Component}) =>
        <Route path={path} element={Component} key={path}/>
      )}
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
};

export default AppRouter;