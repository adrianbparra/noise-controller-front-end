import React, { useState,useEffect } from 'react';
import {useParams} from "react-router-dom";

import { useQuery, useMutation } from '@apollo/client';
import {USER, SELECTEDCLASS, ADDCLASS} from "../queries/queries";


import { Form, Input, Select, Button, Message,  Header, Divider, Segment } from "semantic-ui-react";
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required("Class name is required"),
  theme: yup.string().required(),
  grade: yup.string().required(),
  numberOfKids: yup.number().typeError("Please enter a Number").required("Please enter a Number"),

})

const grades = [
  {key:"0", text:"Kindergarten", value: "Kindergarten"},
  {key:"1", text:"First Grade", value: "First Grade"},
  {key:"2", text:"Second Grade", value: "Second Grade"},
  {key:"3", text:"Third Grade", value: "Third Grade"},
  {key:"4", text:"Fourth Grade", value: "Fourth Grade"},
  {key:"5", text:"Fifth grade", value: "Fifth grade"},
  {key:"o", text:"Other", value:"Other"}

]


const ClassSignUp = props => {
  const [header, setHeader] = useState("")
  const [errors, setErrors] = useState([])
  const [classSignupCreds, setClassSignupCreds] = useState({
      name: "",
      theme: "Farm",
      grade: "Kindergarten",
      numberOfKids: 0 ,

  });

  const  {loading: selectedloading, data} = useQuery(SELECTEDCLASS)

  const [addClass, {loading: classLoading}] = useMutation(ADDCLASS,{
    update(proxy, result) {
      const data = proxy.readQuery({
        query: USER
      });
      
      proxy.writeQuery({ 
        query: USER, 
        data:{
          ...data,
          getUser: {
            ...data.getUser,
            classes: [
              ...data.getUser.classes,
              result.data.addClass
            ]
          }
        }
      });

      props.history.push("/")
    },
    onError(error){
      setErrors({
        message: error.message
      })
    }
  })
  const params = useParams();


  useEffect(()=>{
    
    
    if (data){
      console.log(data)

      if (data.getUser.selectedClass){
        if(params["name"] === data.getUser.selectedClass){
          setHeader("Edit Class")
          console.log("params:",params)
          const {
            id,
            grade,
            name,
            numberOfKids,
            theme,
          } = data.user.selectedClass
          
          setClassSignupCreds({
            id,
            grade,
            name,
            numberOfKids,
            theme
          })
  
        }
      } else if( Object.keys(params).length === 0) {
        setHeader("Add a New Class")
      } else {
        props.history.push("/")
      }
    }
    
  },[data])

  const handleChange = e => {

    const errorCopy = {...errors}

    if (e.target.name in errorCopy){
      delete errorCopy[e.target.name]

      setErrors(errorCopy)
    }

    setClassSignupCreds({
      ...classSignupCreds,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = (e,results) => {
    setClassSignupCreds({
      ...classSignupCreds,
      [results.name]: results.value
    })
  }

  const handleDelete = e => {
    
    props.deleteClass(props.selectedClass.id)
  }


  const handleSubmit = e => {
    e.preventDefault();
    if(params["name"]){
      console.log("edit class")
      schema.validate(classSignupCreds, {
        abortEarly: false
      }).then(function(values) {
        console.log(values)
        
      })
      .catch(function (schemaerrors) {
        schemaerrors.inner.forEach(schemaerror => {
          console.log("Single error:",schemaerror)
          console.log("object error",{[schemaerror.path]: schemaerror.message})
          setErrors({
            ...errors,
            [schemaerror.path]: schemaerror.message
          })
        })
      })
      // props.editClass(classSignupCreds)
    }else {
      console.log("add class")
      schema.validate(classSignupCreds,{abortEarly: false}).then(function(values) {
        addClass({variables:values})
      })
      .catch(function (schemaerrors) {

        schemaerrors.inner.forEach(schemaerror => {
          setErrors({
            ...errors,
            [schemaerror.path]: schemaerror.message
          })
        })

      })
    }
  };


  return (
    
    <Segment>
      
      {/* {params["name"] === props.selectedClass.name &&<Button color="red" floated="right" icon="delete" content="Delete Class" onClick={handleDelete}/> } */}
        <Header as="h3" textAlign="center">{header}</Header>
        <Divider/>
      <Form>
        <Form.Field
          autofocus 
          control={Input}
          label="Class Name"
          placeholder="Class Name"
          name="name"
          value={classSignupCreds.name}
          onChange={handleChange}
          error= {errors.name}
        />
          
        
        <Form.Field
          control={Input}
          type="number"
          min="1"
          label="Students"
          name="numberOfKids"
          placeholder="How many students"
          value={classSignupCreds.numberOfKids}
          onChange={handleChange}
          error= {errors.numberOfKids}
        />
        
        <Form.Field
          label="Grade"
          control={Select}
          options={grades}
          placeholder="Grade"
          name="grade"
          value={classSignupCreds.grade}
          onChange={handleSelect}
          error={errors.grade}
        />

        <Form.Field
          label="Theme"
          control={Select}
          disabled
          options={[{key:"farm", text:"Farm - More coming soon!", value: "Farm"}]}
          name="theme"
          placeholder="Theme"
          value={classSignupCreds.theme}
          onChange={handleSelect}
          error={ errors.theme}
        />
        
        
        <Form.Field 
          onClick={handleSubmit} 
          control={Button} 
          color="primary" 
          disabled= {Object.keys(errors).length > 0  || classLoading || selectedloading}
          >
          Submit
        </Form.Field>
        
      </Form>
      {errors.message && <Message
        error
        header={errors.message}
      />}
    </Segment>
  );
};

export default ClassSignUp;
