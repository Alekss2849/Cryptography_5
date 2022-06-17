import React from 'react';
import {useFormik} from 'formik';
import {useNavigate} from "react-router-dom";
import {LinkContainer} from "react-router-bootstrap";
import {useAppDispatch} from "../../../store/hooks";
import {registration} from "../../../store/actions/userActions";

interface MyFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  isAgreed: boolean;
}

const validate = (values: MyFormValues) => {
  const errors: { password: string, confirmPassword: string, isAgreed: string, email: string } = {
    password: '',
    confirmPassword: '',
    isAgreed: '',
    email: ''
  };
  if (!values.password) {
    errors.password = 'Пароль обязателен';
  } else if (values.password.length < 8) {
    errors.password = 'Короткий пароль';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Подтверждение пароля обязательно';
  } else if (values.confirmPassword.length < 8) {
    errors.confirmPassword = 'Короткий пароль';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Пароли не совпадают';
  }
  if (!values.email) {
    errors.email = 'Адрес электронный почты обязателен';
  } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z]+\.[A-Za-z]+/i.test(values.email)) {
    errors.email = 'Невалидный адрес электронной почты';
  }
  if (!values.isAgreed) {
    errors.isAgreed = 'Соглашайся)';
  }
  return errors;
};

const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      isAgreed: false
    },
    validate,
    onSubmit: () => {
      dispatch(registration(formik.values.email, formik.values.password, 'ADMIN', navigate));
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
          <label className="text" htmlFor="password">Пароль</label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-control"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password ? <div className="error">{formik.errors.password}</div> : null}
        </div>
        <div className="form-group">
          <label className="text" htmlFor="password">Подтвердите пароль</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className="form-control"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
          />
          {formik.errors.confirmPassword ?
            <div className="error">{formik.errors.confirmPassword}</div> : null}
        </div>


        <div className="form-group form-group-inline mt-5">
          <button type="submit" className="btn btn-primary"
                  disabled={!formik.values.isAgreed || formik.errors.hasOwnProperty('password') || formik.errors.hasOwnProperty('confirmPassword')}>
            Регистрация
          </button>
          <LinkContainer to="/login">
            <button className="btn btn-primary-outline">Есть аккаунт? Войдите!</button>
          </LinkContainer>
        </div>
      </form>
      <div className="modal fade" id="show-agreement" tabIndex={-1} role="dialog"
           aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content"><p>Черным по белому - Честное предложение =) </p><p
            style={{color: "white"}}>Рабство)</p></div>
        </div>
      </div>
    </div>
  );
};
export default Registration;