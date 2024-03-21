import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import Input from "../../Components/Input";
import { Strings } from "../../Strings";
import axios from "axios";
import { displayErrorToast, displaySuccessToast } from "../../toaster/toaster";

const SignUp = () => {
  const initialState = {
    username: "",
    email: "",
    password: "",
    reEnterPassword: "",
  };
  const [formValue, setFormValue] = useState(initialState);
  const [formError, setFormError] = useState({});
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    debugger;
    const { username, email, password, reEnterPassword } = formValue;
    if (username && email && password === reEnterPassword) {
      axios
        .post("http://localhost:8080/register", formValue)
        .then((res) => {
          displaySuccessToast(res?.data?.message);
          navigate("/login");
        })
        .catch((err) => displayErrorToast(err?.response?.data?.message));
    }
    setFormError(validate(formValue));
    console.log("formValue", formValue);
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
      <form
        className="flex flex-col justify-center items-center mt-32 bg-slate-50 rounded-lg shadow-lg"
        onSubmit={submitHandler}
      >
        <div className="imageContainer">
          <h4 className="text-4xl font-Medium mt-5">Sign Up</h4>
        </div>
        <div className="container">
          <label className="font-medium" htmlFor="username">
            {Strings.userName}
          </label>
          <Input
            types="text"
            names="username"
            values={formValue.username}
            onChangeHandler={changeHandler}
            placeholdername={Strings.userName}
          />
          <label className="font-medium" htmlFor="emnail">
            {Strings.email}
          </label>
          <Input
            types="email"
            names="email"
            values={formValue.email}
            onChangeHandler={changeHandler}
            placeholdername={Strings.email}
          />
          <p>{formError.email}</p>
          <label className="font-medium" htmlFor="psw">
            Password
          </label>
          <Input
            types="password"
            names="password"
            values={formValue.password}
            onChangeHandler={changeHandler}
            placeholdername={Strings.password}
          />
          <label className="font-medium">Confirm password</label>
          <Input
            types="password"
            names="reEnterPassword"
            values={formValue.reEnterPassword}
            onChangeHandler={changeHandler}
            placeholdername={Strings.confirmPassword}
          />
          <button
            onClick={submitHandler}
            className=" mt-4text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            type="button"
          >
            {Strings.register}
          </button>
        </div>
        <div class="container signin">
          <p cla>
            Already have an account? <Link to="/login">SignIn</Link>.
          </p>
        </div>
      </form>
    </>
  );
};

export default SignUp;
