import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { Formik } from "formik";
import * as yup from "yup";

import { useMutation } from '@apollo/client';
import {LOGIN_USER,USER} from "../queries/queries";

// import { AuthContext } from "../context/auth.js";

import { Header, Form, Message, Segment } from 'semantic-ui-react';


const yupValidation = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Please enter your email"),
  password: yup.string().min(8,"Password must be at least 8 characters").required("Please enter your password")
})



const Login = props => {
  // const context = useContext(AuthContext);

  const [gqlResponse,setGqlResponse] = useState({});

  const [Login, {loading}] = useMutation(LOGIN_USER,{
    update(proxy, {data: {login: userData}}){
      console.log(userData)
      // context.login(userData)
      props.history.push("/")
    },onError(err){
      // console.log(err)
      if (err.graphQLErrors){
        setGqlResponse({error: true, message: err.message, ...err.graphQLErrors[0].extensions.exception.errors })

      }
    }
  })

  return (
    <>
    <Segment>
      
      <Header as="h1" textAlign="center">Login</Header>

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={yupValidation}
        onSubmit={(values) => {
          console.log(values)
          Login({variables: values})
        }}
        
        validateOnChange={false}
      >
        { props => (
        
          <Form>
              
            <Form.Input
              label="Email"
              type="email"
              name="email"
              placeholder="Enter email..."
              value={props.values.email}
              onChange={(e) => {
                props.setErrors({})
                setGqlResponse({})
                props.handleChange(e)
              }}
              autoComplete="email"
              error={props.errors.email || gqlResponse.email}
            />
            <Form.Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter password..."
              value={props.values.password}
              onChange={(e) => {
                props.setErrors({})
                setGqlResponse({})
                props.handleChange(e)
              }}
              autoComplete="current-password"
              error={props.errors.password || gqlResponse.password}
            />

            <Form.Button
              loading={loading}
              fluid
              color="primary"
              size="large"
              type="submit"
              onClick={props.handleSubmit}
              disabled={!Object.keys(props.errors).length === 0 || !Object.keys(gqlResponse).length === 0}
              >
              Submit
            </Form.Button>
              
          </Form>
        )}

      </Formik>

        <Message size='big'>
            New to us? <Link to='/signup'>Sign up</Link>
        </Message>
  
    </Segment>

    {
      (Object.keys(gqlResponse).length > 0 && 
      <Message
        hidden={gqlResponse ? false : true}
        success={gqlResponse.success}
        negative={gqlResponse.error}
        header={ gqlResponse.message? gqlResponse.message : ""}
      />)
    }

    </>
  );
};
export default Login;