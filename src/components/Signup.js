import React, {useState, useContext} from "react";
import { Link } from 'react-router-dom';
import { Form, Header, Message, Segment } from 'semantic-ui-react';

import { Formik } from "formik";
import * as yup from "yup";

import { AuthContext } from "../auth/auth.js";

import { useMutation } from '@apollo/client';
import {SIGN_UP_USER} from "../queries/queries";

const yupValidation = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Please enter your email"),
  title: yup.string().required("Please enter your title"),
  lastName: yup.string().required("Last Name is Required"),
  password: yup.string().required("Please enter password").min(8, "Password must be at least 8 characters").oneOf([yup.ref("confirmPassword")], "Passwords must match"),
  confirmPassword: yup.string().required("Please confirm password").min(8, "Password must be at least 8 characters").oneOf([yup.ref("password")], "Passwords must match")
})

const title = [
  {key:"0", text:"Dr.", value: "Dr."},
  {key:"0", text:"Mr.", value: "Mr."},
  {key:"0", text:"Mrs.", value: "Mrs."},
  {key:"0", text:"Ms.", value: "Ms."},

]


const Signup = props => {
  const context = useContext(AuthContext)
  const [gqlResponse,setGqlResponse] = useState({})
  
  const [SIGN_UP, {loading}] = useMutation(SIGN_UP_USER,{
    update(proxy, {data: {register: userData}}){
      context.login(userData)
      props.history.push("/")
    },onError(err){
      if (err.graphQLErrors){
        setGqlResponse({error: true, message: err.message, ...err.graphQLErrors[0].extensions.exception.errors })

      }
    }
  })

  // console.log("loading:", loading, "data:", data, "errors:", errors)

  return (
    <>
    <Segment>
      
        <Header as='h1' textAlign="center">
          Sign Up
        </Header>

        <Formik
        initialValues={{
          email: "",
          title: "",
          firstName: "",
          lastName: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={yupValidation}
        onSubmit={(values) => {
          console.log(values)
          SIGN_UP({variables:values})
        }}
        
        validateOnChange={false}
      >
        {props => (
          <Form>
            <Form.Input
              label="Email"
              type="text"
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
            <Form.Select
              label="Title"
              placeholder="Title"
              name="title"
              options={title}
              value={props.values.title}
              onChange={(e,results) => {
                props.setFieldValue("title", results.value)
                props.setErrors({})
                setGqlResponse({})
              }}
              error={props.errors.title}
              fluid
            />
            <Form.Input
              label="First Name"
              type="text"
              name="firstName"
              placeholder="Enter first name..."
              value={props.values.firstName}
              onChange={(e) => {
                props.setErrors({})
                setGqlResponse({})
                props.handleChange(e)
              }}
              autoComplete="first name"
              error={props.errors.firstName}
            />
            <Form.Input
              label="Last Name"
              type="text"
              name="lastName"
              placeholder="Enter last name..."
              value={props.values.lastName}
              onChange={(e) => {
                props.setErrors({})
                setGqlResponse({})
                props.handleChange(e)
              }}
              autoComplete="last name"
              error={props.errors.lastName}
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
              error={props.errors.password || gqlResponse.password}
            />
            
            <Form.Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="Confirm password..."
              value={props.values.confirmPassword}
              onChange={(e) => {
                props.setErrors({})
                setGqlResponse({})
                props.handleChange(e)
              }}
              error={props.errors.confirmPassword}
            />

            <Form.Button

              fluid
              color="teal"
              size='large'
              type='submit'
              onClick={props.handleSubmit}
              disabled={!Object.keys(props.errors).length == 0 || !Object.keys(gqlResponse).length == 0}
              loading={loading}
            >
              Submit
            </Form.Button>
            
          </Form>
          )}
        </Formik>
          
        <Message size='big'>
          Already have an account? <Link to='/login'>Login</Link>
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

export default Signup;