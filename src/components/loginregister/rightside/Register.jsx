import React, { useRef, useState } from "react";

// Libraries
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

// Components
import Input from "components/inputs/Input";
import Button from "components/buttons/Button";
import BackButton from "components/buttons/BackButton";

// Actions
import { LR } from "redux/actions";

// Requests
import { handleErrors, UserRegister } from "requests";

const Register = () => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const RegisterRippleRef = useRef();
  const BackRippleRef = useRef();
  const email = useSelector(state => state.LR.email);
  const [errMsg, setErrMsg] = useState();
  const [loading, setLoading] = useState(false);

  const onSubmit = data => {
    setLoading(true);
    setErrMsg("");

    UserRegister({ email, ...data })
      .then(res => {
        setLoading(false);
        dispatch(LR({ isModalOpen: false }));
      })
      .catch(err => {
        setLoading(false);
        handleErrors(err, setErrMsg);
      });
  };

  return (
    <>
      <p className="lr-title no-select">ثبت‌نام</p>
      <div className="lr-email">
        <div className="inner">{email}</div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="نام نمایشی"
          type="text"
          id="displayname"
          name="displayname"
          ref={register({ required: true })}
          error={errors.displayname}
          autoFocus
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Input
            label="رمز عبور"
            type="password"
            id="password"
            name="password"
            ref={register({ required: true })}
            error={errors.password}
            wrapperStyle={{ width: "49%" }}
          />
          <Input
            label="تایید رمز عبور"
            type="password"
            id="confirm_password"
            name="confirm_password"
            ref={register({ required: true })}
            error={errors.confirm_password}
            noBreak
            wrapperStyle={{ width: "49%" }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            className="w-68"
            ref={RegisterRippleRef}
            title="ثبت‌نام"
            loading={loading}
          />
          <BackButton
            ref={BackRippleRef}
            className="w-30"
            onClick={() => dispatch(LR({ page: "Email" }))}
          />
        </div>
      </form>
      {!!errMsg?.length && <div className="error-message">{errMsg}</div>}
    </>
  );
};

export default Register;
