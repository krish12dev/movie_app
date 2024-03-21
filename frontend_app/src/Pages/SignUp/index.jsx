import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Signup.css";
import Input from "../../Components/Input";
import { Strings } from "../../Strings";
import axios from 'axios'

const SignUp = () => {
  const initialState = {username: "", email: "", password: "", reEnterPassword: "" };
  const [formValue, setFormValue] = useState(initialState);
  const [formError, setFormError] = useState({});
  const [formOutput, setFormOutput] = useState([]);
  const [editableIndex, setEditableIndex] = useState(-1);
  const [isEditable, setIsEditable] = useState(false);
  const [isSubmit, setSubmit] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    debugger
    const {username,email,password,reEnterPassword} = formValue
    if(username && email && (password === reEnterPassword)){
      axios.post("http://localhost:8080/register",formValue)
      .then((res)=>{
        console.log("check the  status of api",res)
      })
      .catch((err)=>{
        return err
      })
    }
    setFormError(validate(formValue));
    console.log("formValue",formValue)
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
        <label htmlFor="username">{Strings.userName}</label>
          <Input
            types="text"
            names="username"
            values={formValue.username}
            onChangeHandler={changeHandler}
            placeholdername={Strings.userName}
          />
          <label htmlFor="emnail">{Strings.email}</label>
          <Input
            types="email"
            names="email"
            values={formValue.email}
            onChangeHandler={changeHandler}
            placeholdername={Strings.email}
          />
          <p>{formError.email}</p>
          <label htmlFor="psw">Password</label>
          <Input
            types="password"
            names="password"
            values={formValue.password}
            onChangeHandler={changeHandler}
            placeholdername={Strings.password}
          />
          <label>Confirm password</label>
          <Input
            types="password"
            names="reEnterPassword"
            values={formValue.reEnterPassword}
            onChangeHandler={changeHandler}
            placeholdername={Strings.confirmPassword}
          />
          <button className="registation" type="submit" onClick={submitHandler}>
            {Strings.register}
          </button>
        </div>
        <div class="container signin">
          <p>
            Already have an account? <Link to="/login">SignIn</Link>.
          </p>
        </div>
      </form>
    </>
  );
};

export default SignUp;
