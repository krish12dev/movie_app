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
    role: "",
  };
  const [formValue, setFormValue] = useState(initialState);
  const [formError, setFormError] = useState({});
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const { username, email, password, reEnterPassword,role } = formValue;
    if (username && email && password === reEnterPassword && role) {
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
    debugger
    const errors = {};
    const emailValid = /\S+@\S+\.\S+/;
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!emailValid.test(values.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!values.password) {
      errors.password = "Please Enter password";
    }
    if (!values?.username) {
      errors.username = "Please enter user name";
    }
    if (!values.reEnterPassword) {
      errors.reEnterPassword = "Please enter the confirm password";
    } else if (values?.password !== values?.reEnterPassword) {
      errors.reEnterPassword = "Password didn't match";
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
          <p className="text-red-800 bg-red-50 dark:text-red-400">
            {formError.username}
          </p>
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
          <p className="text-red-800 bg-red-50 dark:text-red-400">
            {formError.email}
          </p>
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
          <p className="text-red-800 bg-red-50 dark:text-red-400">
            {formError.password}
          </p>
          <label className="font-medium">Confirm password</label>
          <Input
            types="password"
            names="reEnterPassword"
            values={formValue.reEnterPassword}
            onChangeHandler={changeHandler}
            placeholdername={Strings.confirmPassword}
          />
          <p className="text-red-800 bg-red-50 dark:text-red-400">
            {formError.reEnterPassword}
          </p>
          <label>Role</label>
          <select
            id="small"
            value={formValue?.role}
            onChange={(e) =>
              setFormValue((prev) => ({ ...prev, role: e.target.value }))
            }
            class="block w-full p-2 mb-6 text-sm text-black-900 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose a roles</option>
            <option value="admin">admin</option>
            <option value="user">user</option>
          </select>
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
