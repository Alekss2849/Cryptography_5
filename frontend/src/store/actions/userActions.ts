import {ACTIONS} from "../../utils/constants";
import {toast} from "react-toastify";
import {apiGet, apiPost} from "../../http/httpPlaceholder";
import jwtDecode from "jwt-decode";

//экшен
export const setUser = (email: string, password: string, navigate: any) => {
  return async (dispatch: any) => {
    //запрос логина на бек
    apiPost({
      url: '/auth/login',
      data: {
        email, password
      }
    }).then(({data}) => {
      //если все ок, то ставим токен в локальное хранилище, чтоб при перезапуске страницы(=релоад хранилища) мы могли знать был ли юзер
      const {token} = data;
      localStorage.setItem('token', token);
      let decoded: { role: string, email: string } = jwtDecode(token);
      //диспатчим ивент сета юзера
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
//регистрация
export const registration = (email: string, password: string, role: string, navigate: any) => {
  return async (dispatch: any) => {
    //пост запрос для регистрации
    apiPost({
      url: '/auth/register',
      data: {
        email, password, role
      }
    }).then(({data}) => {
      //если все ок сетим токен
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
      //перенаправляем в админку
      navigate('/admin');
    })
      .catch(() =>
        toast("Проверьте логин или пароль")
      );
  };
};
//при загрузке страницы чекаем есть ли токен, смотрим его валидность, если все ок, то он на беке зарефрешился и сетим новый токен
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