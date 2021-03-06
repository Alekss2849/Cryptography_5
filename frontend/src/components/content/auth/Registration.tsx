import React from 'react';
import {useFormik} from 'formik';
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../store/hooks";
import {registration} from "../../../store/actions/userActions";
import {toast} from "react-toastify";

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

  const submit = async (email: string, password: string) => {
    try {
      dispatch(registration(email, password, 'ADMIN', navigate));
    } catch (e) {
      toast("Проверьте логин или пароль");
    }
  };
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
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="agree-check" required
                 checked={formik.values.isAgreed}
                 onClick={() => formik.values.isAgreed = !formik.values.isAgreed}
                 onChange={formik.handleChange}
          />
          <p>Я принимаю условия&nbsp;
            <a href="#" className="primary-link" data-toggle="modal" data-target="#show-agreement">Пользовательского
              соглашения</a>
          </p>
        </div>

        <div className="form-group form-group-inline mt-5">
          <button className="btn btn-primary" onClick={() => submit(formik.values.email, formik.values.password)}
                  disabled={!formik.values.isAgreed || formik.errors.password !== '' || formik.errors.confirmPassword !== ''}>
            Регистрация
          </button>
          <div onClick={() => navigate("/login")}>
            <button className="btn btn-primary-outline">Already have acc? Log in!</button>
          </div>
        </div>
      </form>
      <div className="modal fade" id="show-agreement" tabIndex={-1} role="dialog"
           aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content"><p>Its ok, trust me.</p><p
            style={{color: "white"}}>Hohoho, I lied)))</p></div>
        </div>
      </div>
    </div>
  );
};
export default Registration;