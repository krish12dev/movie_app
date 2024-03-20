import { useEffect, useState } from "react";
import Input from "../../Components/Input";
import { Strings } from "../../Strings";
import { Link, Outlet } from "react-router-dom";
import "./login.css";
const LoginPage = () => {
  const initialState = { username: "", password: "", checkbox: true };
  const [formValue, setFormValue] = useState(initialState);
  const [formError, setFormError] = useState({});
  const [submitValue, setSubmitValue] = useState(false);
  const [output, setOutPut] = useState([]);
  const [editableIndex, setEditableIndex] = useState(-1);
  const [isEditable, setEditable] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setFormError(validate(formValue));
    setSubmitValue(true);
    const currentdata = [...output, formValue];
    setOutPut(currentdata);
    setFormValue(initialState);
  };
  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  //   const deleteHandler =(index)=>{
  //     const recentdata = (output.filter((item,i)=> i !== index))
  //     setOutPut(recentdata)

  //   }
  //   const editHandler =(index) =>{
  //     const selectItem = output[index]
  //     setFormValue(selectItem)
  //     setEditableIndex(index)
  //     setEditable(true)

  //   }
  //   const updateHandler =(e,index) =>{
  //     e.preventDefault()
  //     const updateData = [...output]
  //     if(editableIndex !== null && editableIndex >=0){
  //       updateData[editableIndex] = formValue
  //       setEditable(false)
  //       setOutPut(updateData)
  //       setFormValue(initialState)
  //     }
  //   }

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="imageContainer">
          <img src="img_avatar2.png" alt="company logo" className="avatar" />
        </div>
        <div className="container">
          <label htmlFor="uname">
            <b>Username</b>
          </label>
          <Input
            types="text"
            names="username"
            values={formValue.username}
            onChangeHandler={changeHandler}
            placeholdername={Strings.emailOrPhoneNumber}
          />
          <p className="errorField">{formError.username}</p>
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
          <p className="errorfield">{formError.password}</p>
          <button type="submit">Login</button>
          <label>
            <Input
              types="checkbox"
              names="checkbox"
              values={formValue.checkbox}
              onChangeHandler={changeHandler}
              placeholdername={Strings.emailOrPhoneNumber}
            />
            Remember me
          </label>
        </div>
        <div className="container">
          <span>
            <Link to="/forgot_password">Forgot Password</Link>
          </span>
          <span className="sign_up">
            <Link to="/signup">Sign up</Link>
          </span>
        </div>
        <Outlet />
      </form>
    </>
  );
};
export default LoginPage;
