import React, {useState} from 'react';
import {useFormik} from 'formik';
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

import {setUser} from "../../../store/actions/userActions";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {LinkContainer} from "react-router-bootstrap";

interface MyFormValues {
  email: string;
  password: string;
}


const validate = (values: MyFormValues) => {
  const errors: { email?: string, password?: string } = {};
  if (!values.password) {
    errors.password = 'Пароль обязателен';
  } else if (values.password.length < 8) {
    errors.password = 'Короткий пароль';
  }
  if (!values.email) {
    errors.email = 'Адрес электронный почты обязателен';
  } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z]+\.[A-Za-z]+/i.test(values.email)) {
    errors.email = 'Невалидный адрес электронной почты';
  }
  return errors;
};

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [type, setType] = useState('password');
  const role = useAppSelector((state) => state.user.role);
  const isReady = useAppSelector((state) => state.user.isReady);

  const formik = useFormik<MyFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: async () => {
      try {
        dispatch(setUser(formik.values.email, formik.values.password, navigate));
      } catch (e) {
        toast("Проверьте логин или пароль");
      }
    }
  });
  const loginPageStyle = {
    margin: "32px auto 37px",
    maxWidth: "50%",
    background: "#fff",
    padding: "50px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.15)",
  };
  if (role === 'ADMIN') {
    navigate('/admin');
  }
  return (
    <div style={loginPageStyle}>
      <form onSubmit={formik.handleSubmit} className="form">
        <div className="form-group">
          <label className="text" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            className="form-control"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
        </div>
        <div className="form-group">
          <label className="text" htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            className="form-control"
            type={type}
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <span
            style={{cursor: "pointer"}}
            onClick={(e) => {
              e.preventDefault();
              if (type !== 'text') {
                setType('text');
              } else {
                setType('password');
              }
            }}>
              {
                type === 'password' ?
                  <img src="https://img.icons8.com/ios-filled/20/000000/closed-eye.png" alt=""/> :
                  <img src="https://img.icons8.com/ios-glyphs/20/000000/visible--v1.png" alt=""/>
              }
            &nbsp;
            {
              type === 'password' ?
                "See" :
                "Hide"
            }
          </span>
          {formik.errors.password ? <div className="error">{formik.errors.password}</div> : null}
        </div>
        <div className="form-group form-group-inline">
          <button type="submit" className="btn btn-primary" disabled={isReady}>
            Log in
          </button>
          <LinkContainer to="/registration">
            <button className="btn btn-primary-outline">Нет аккаунта? Зарегистрируйтесь!</button>
          </LinkContainer>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
