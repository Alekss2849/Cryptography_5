import {ACTIONS} from "../../utils/constants";
import {toast} from "react-toastify";
import {apiDelete, apiGet, apiPost, apiPut} from "../../http/httpPlaceholder";
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
      let decoded: { role: string, email: string, id: number } = jwtDecode(token);
      dispatch({
        type: ACTIONS.USER.SET_USER,
        payload: {
          id: decoded.id,
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

export const setUserInfo = (id: number) => {
  return async (dispatch: any) => {
    apiGet({
      url: `/info/get-info/${id}`
    }).then(({data}) => {
      const {phone_number} = data || "";
      dispatch({
        type: ACTIONS.USER.SET_USER_INFO,
        payload: {
          phone_number
        }
      });
    })
      .catch(() =>
        toast("Проверьте логин или пароль")
      );
  };
};
export const deleteAcc = (id: number) => {
  return async (dispatch: any) => {
    apiDelete({
      url: `/info/delete-account/${id}`
    }).then(() => {
      dispatch({
        type: "LOG_OUT",
      });
    })
      .catch(() =>
        toast("Проверьте логин или пароль")
      );
  };
};
export const updatePhoneNumber = (id: number, phone_number: string) => {
  return async (dispatch: any) => {
    apiPut({
      url: `/info/update-info/${id}`,
      data: {
        phone_number
      }
    }).then(() => {
      dispatch({
        type: ACTIONS.USER.SET_USER_INFO,
        payload: {
          phone_number
        }
      });
    })
      .catch(() =>
        toast("Проверьте логин или пароль")
      );
  };
};