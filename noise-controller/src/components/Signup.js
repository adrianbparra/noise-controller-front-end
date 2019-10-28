import React, { useState } from "react";
import { axiosWithAuth } from '../data/axiosAuth';

const Signup = props => {

const [signupCreds, setSignupCreds] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    // title: "",
    err: null
  });

  const handleChange = e => {
    setSignupCreds({
      ...signupCreds,
      [e.target.name]: e.target.value,
      err: null
    });
  };

  const signup = () => {
    axiosWithAuth()
      .post(`https://noise-controller-backend.herokuapp.com/api/teachers/register`, {
        username: signupCreds.username,
        password: signupCreds.password,
        email: signupCreds.email,
        // title: signupCreds.title,
        firstName: signupCreds.firstName,
        lastName: signupCreds.lastName,
      })
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/home");
      })
      .catch(err =>
        console.log(props)
        // setSignupCreds({
        //   ...signupCreds,
        //   err: "Error signing up. Please try again."
        // })
      );
  };

  const handleSubmit = e => {
    e.preventDefault();
    signupCreds.username === "" || signupCreds.password === ""
      ? setSignupCreds({
          ...signupCreds,
          err: "Please complete all login fields."
        })
      : signup();
  };

  return (
    <div className="signup-page">
    <form>
        <h4>Sign Up</h4>
        {/* <select 
          name="title"
          onChange={handleChange}
        />
            <option value={signupCreds.title}>Mr.</option>
            <option value={signupCreds.title}>Mrs.</option>
            <option value={signupCreds.title}>Ms.</option>
        </select> */}
        {/* <input
          type="select"
          name="title"
          onChange={handleChange}
        >
            <option value={signupCreds.title}>Mr.</option>
            <option value={signupCreds.title}>Mrs.</option>
            <option value={signupCreds.title}>Ms.</option>
        </input> */}
        <input
          type="text"
          name="firstName"
          placeholder="Enter first name..."
          value={signupCreds.firstName}
          onChange={handleChange}
          autoComplete="first name"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Enter last name..."
          value={signupCreds.lastName}
          onChange={handleChange}
          autoComplete="last name"
        />
        <input
          type="text"
          name="username"
          placeholder="Enter username..."
          value={signupCreds.username}
          onChange={handleChange}
          autoComplete="username"
        />
        <input
          type="text"
          name="email"
          placeholder="Enter email..."
          value={signupCreds.email}
          onChange={handleChange}
          autoComplete="email"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password..."
          value={signupCreds.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
        <button onClick={handleSubmit}>Sign Up</button>
        {signupCreds.err && (
          <div className="error-container">{signupCreds.err}</div>
        )}
      </form>
    </div>
  );
};
export default Signup;