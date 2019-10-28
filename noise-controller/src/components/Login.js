import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Header, Button, Grid, Message, Segment } from 'semantic-ui-react';
import { axiosWithAuth } from "../data/axiosAuth";

const Login = props => {
const [loginCreds, setLoginCreds] = useState({
    username: "",
    password: "",
    err: null
  });

  const handleChange = e => {
    setLoginCreds({
      ...loginCreds,
      [e.target.name]: e.target.value,
      err: null
    });
  };

  const login = () => {
    axiosWithAuth()
      .post(`https://noise-controller-backend.herokuapp.com/api/teachers/login`, {
        username: loginCreds.username,
        password: loginCreds.password
      })
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/home");
      })
      .catch(err =>
        setLoginCreds({
          ...loginCreds,
          err: "Error logging in. Please try again."
        })
      );
  };

  const handleSubmit = e => {
    e.preventDefault();
    loginCreds.username === "" || loginCreds.password === ""
      ? setLoginCreds({
          ...loginCreds,
          err: "Please complete all login fields."
        })
      : login();
  };

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" style={{ color: '#2B4162' }} textAlign="center">Login</Header>
            <form>
                <Segment stacked>
                    <input
                    type="text"
                    name="username"
                    placeholder="Enter username..."
                    value={loginCreds.username}
                    onChange={handleChange}
                    autoComplete="username"
                    />
                    <input
                    type="password"
                    name="password"
                    placeholder="Enter password..."
                    value={loginCreds.password}
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
                  size="large"
                  type="submit"
                  onClick={handleSubmit}>
                  Login
                </Button>
                    {loginCreds.err && (
                    <div className="error-container">{loginCreds.err}</div>
                    )}
                </Segment>
            </form>
      </Grid.Column>
    </Grid>
  );
};
export default Login;