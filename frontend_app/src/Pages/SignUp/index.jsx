import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Signup.css";
import Input from "../../Components/Input";
import { Strings } from "../../Strings";

const SignUp = () => {
  const initialState = { email: "", password: "", pswconf: "" };
  const [formValue, setFormValue] = useState(initialState);
  const [formError, setFormError] = useState({});
  const [formOutput, setFormOutput] = useState([]);
  const [editableIndex, setEditableIndex] = useState(-1);
  const [isEditable, setIsEditable] = useState(false);
  const [isSubmit, setSubmit] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setFormError(validate(formValue));
    const currentdata = [...formOutput, formValue];
    setFormOutput(currentdata);
  };
  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Please enter valid email id";
    }
    return errors;
  };
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="container">
          <label htmlFor="emnail">{Strings.email}</label>
          <Input
            types="email"
            names="email"
            values={formValue.email}
            onChangeHandler={changeHandler}
            placeholdername={Strings.email}
          />
          <p>{formError.email}</p>
          <label htmlFor="username">{Strings.userName}</label>
          <Input
            types="text"
            names="username"
            values={formValue.username}
            onChangeHandler={changeHandler}
            placeholdername={Strings.userName}
          />
          <label htmlFor="psw">Password</label>
          <Input
            types="text"
            names="password"
            values={formValue.password}
            onChangeHandler={changeHandler}
            placeholdername={Strings.password}
          />
          <label>Confirm password</label>
          <Input
            types="text"
            names="password"
            values={formValue.password}
            onChangeHandler={changeHandler}
            placeholdername={Strings.confirmPassword}
          />
          <div className="gender">
            <label htmlFor="gender">Gender</label>
            <br />
            <Input
              className="app-check"
              types="Radio"
              names="male"
              values="male"
            />
            <label>Male</label>
            <Input
              className="app-check"
              types="Radio"
              names="female"
              values="female"
            />
            <label>Female</label>
          </div>
          <hr />

          <button className="registation" type="submit">
            Registaation
          </button>
        </div>
        <div class="container signin">
          <p>
            Already have an account? <Link to="/signup">SignIn</Link>.
          </p>
        </div>
      </form>
    </>
  );
};

export default SignUp;
