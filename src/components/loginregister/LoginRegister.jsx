import React, { useState } from "react";

// Libraries
import { useDispatch } from "react-redux";

// Components
import Login from "./Login";
import Register from "./Register";

// Actions
import { closeLoginRegisterModal } from "redux/actions";

// Design
import "./loginregister.scss";

const LoginRegister = () => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("login");

  return (
    <div className="login-register-wrapper">
      <div
        className="close-modal"
        onClick={() => dispatch(closeLoginRegisterModal())}
      >
        x
      </div>
      <div className="tab-header">
        <div
          className={`tab-item no-select ${status === "login" && "active"}`}
          onClick={() => setStatus("login")}
        >
          ورود
        </div>
        <div
          className={`tab-item no-select ${status === "register" && "active"}`}
          onClick={() => setStatus("register")}
        >
          ثبت نام
        </div>
      </div>
      <div className="tab-content">
        {status === "login" && <Login />}
        {status === "register" && <Register />}
      </div>
    </div>
  );
};

export default LoginRegister;
