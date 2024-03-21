import { useState } from "react";
import Input from "../../Components/Input";
import { Strings } from "../../Strings";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import { displayErrorToast, displaySuccessToast } from "../../toaster/toaster";

const LoginPage = () => {
  // all local states
  const initialState = { email: "", password: "", checkbox: true };
  const [formValue, setFormValue] = useState(initialState);
  const [formError, setFormError] = useState({});

  // all hooks
  const navigator = useNavigate();

  // all effects

  const submitHandler = (e) => {
    e.preventDefault();
    setFormError(validate(formValue));
    axios
      .post("http://localhost:8080/login", formValue)
      .then((res) => {
        console.log({ res });
        if (res.data.success) {
          if (!res?.data?.token) {
            throw new Error("Token is not available.");
          }
          localStorage.setItem("token", res.data.token);
          displaySuccessToast(res?.data?.message);
          navigator("/");
        }
      })
      .catch((err) => displayErrorToast(err?.response?.data?.message));
  };
  const validate = (values) => {
    const errors = {};
    const emailValid = /\S+@\S+\.\S+/;
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!emailValid.test(values.email)) { // Use test() method to check email validity
      errors.email = "Please enter a valid email address";
    }
    if (!values.password) {
      errors.password = "Password is required";
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
          <h4 className="text-4xl font-Medium mt-5">Login</h4>
        </div>
        <div className="container">
          <label htmlFor="email">
            <b>{Strings.email}</b>
          </label>
          <Input
            types="text"
            names="email"
            values={formValue.email}
            onChangeHandler={changeHandler}
            placeholdername={Strings.emailOrPhoneNumber}
          />
          <p className="text-red-800 bg-red-50 dark:text-red-400" >{formError.email}</p>
          <label htmlFor="password">
            <b>password</b>
          </label>
          <Input
            types="password"
            names="password"
            values={formValue.password}
            onChangeHandler={changeHandler}
            placeholdername={Strings.password}
          />
          <p className="text-red-800 bg-red-50 dark:text-red-400">{formError.password}</p>
        </div>
        <div className="container">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            type="button"
            onClick={submitHandler}
          >
            Login
          </button>
          <span className="sign_up text-blue-700">
            <Link to="/signup">Sign up</Link>
          </span>
        </div>
        <Outlet />
      </form>
    </>
  );
};
export default LoginPage;
