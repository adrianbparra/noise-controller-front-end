import React, { useState } from 'react';
import axiosWithAuth from '../axiosWithAuth';


const ClassSignUp = props => {

const [classSignupCreds, setClassSignupCreds] = useState({
    name: "",
    teacherId: "",
    grade: ""
  });

  const handleChange = e => {
    setClassSignupCreds({
      ...classSignupCreds,
      [e.target.name]: e.target.value,
      err: null
    });
  };

  const signup = () => {
    axiosWithAuth()
      .post(`https://noise-controller-backend.herokuapp.com/api/classes`, {
        name: classSignupCreds.name,
        teacherId: classSignupCreds.teacherId,
        grade: classSignupCreds.grade
      })
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/home");
      })
      .catch(err =>
        setClassSignupCreds({
          ...classSignupCreds,
          err: "Error creating class. Please try again."
        })
      );
  };

  const handleSubmit = e => {
    e.preventDefault();
    classSignupCreds.name === "" || classSignupCreds.teacherId === "" || classSignupCreds.grade === ""
      ? setClassSignupCreds({
          ...classSignupCreds,
          err: "Please complete all class signup fields."
        })
      : signup();
  };

  return (
    <div className="classSignup-page">
    <form>
        <h4>Enter Class Info</h4>
        <input
          type="text"
          name="name"
          placeholder="Enter class name..."
          value={classSignupCreds.name}
          onChange={handleChange}
          autoComplete="name"
        />
        <input
          type="text"
          name="teacherId"
          placeholder="Enter teacher ID..."
          value={classSignupCreds.teacherId}
          onChange={handleChange}
          autoComplete="teacher-Id"
        />
        <input
          type="text"
          name="grade"
          placeholder="Enter grade level..."
          value={classSignupCreds.grade}
          onChange={handleChange}
          autoComplete="grade-level"
        />
        <button onClick={handleSubmit}>Submit</button>
        {classSignupCreds.err && (
          <div className="error-container">{classSignupCreds.err}</div>
        )}
      </form>
    </div>
  );
};
export default ClassSignUp;
