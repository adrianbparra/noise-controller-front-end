import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { axiosWithAuth } from '../data/axiosAuth';
import { Header, Button, Grid, Message, Segment } from 'semantic-ui-react';

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
    <Grid textAlign="center" style= {{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' style={{ color: '#2B4162' }}>
          Sign Up
        </Header>
          <form>
            <Segment stacked>
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
              <Button
                style={{
                  color: 'white',
                  backgroundColor: '#2B4162',
                  marginTop: '10px'
                }}
                fluid
                size='large'
                type='submit'
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
                {signupCreds.err && (
                  <div className="error-container">{signupCreds.err}</div>
                )}
            </Segment>
          </form>
          <Message>
            Already have an account? <Link to='/login'>Log in</Link>
          </Message>
      </Grid.Column>
    </Grid>
  );
};
export default Signup;