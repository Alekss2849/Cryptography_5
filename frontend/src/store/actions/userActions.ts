import {ACTIONS} from "../../utils/constants";
import {toast} from "react-toastify";
import {apiGet, apiPost} from "../../http/httpPlaceholder";
import jwtDecode from "jwt-decode";

export const setUser = (email: string, password: string, navigate: any) => {
  return async (dispatch: any) => {
    apiPost({
      url: '/auth/login',
      data: {
        email, password
      }
    }).then(({data}) => {
      const {token} = data;
      localStorage.setItem('token', token);
      let decoded: { role: string, email: string } = jwtDecode(token);

      dispatch({
        type: ACTIONS.USER.SET_USER,
        payload: {
          role: decoded.role,
          email: decoded.email,
          token
        }
      });
      navigate('/admin');
    })
      .catch(() =>
        toast("Проверьте логин или пароль")
      );
  };
};

export const registration = (email: string, password: string, role: string, navigate: any) => {
  return async (dispatch: any) => {
    apiPost({
      url: '/auth/register',
      data: {
        email, password, role
      }
    }).then(({data}) => {
      const {token} = data;
      localStorage.setItem('token', token);
      let decoded: { role: string, email: string } = jwtDecode(token);

      dispatch({
        type: ACTIONS.USER.SET_USER,
        payload: {
          role: decoded.role,
          email: decoded.email,
          token
        }
      });
      navigate('/admin');
    })
      .catch(() =>
        toast("Проверьте логин или пароль")
      );
  };
};

export const checkToken = (navigate: any) => {
  return async (dispatch: any) => {
    apiGet({
      url: '/auth/check-token'
    }).then(({data}) => {
      const {token} = data;
      localStorage.setItem('token', token);
      let decoded: { role: string, email: string } = jwtDecode(token);
      dispatch({
        type: ACTIONS.USER.SET_USER,
        payload: {
          role: decoded.role,
          email: decoded.email,
          token
        }
      });
      navigate('/admin');
    })
      .catch(() =>
        toast("Проверьте логин или пароль")
      );
  };
};