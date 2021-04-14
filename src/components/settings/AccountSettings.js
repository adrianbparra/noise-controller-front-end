import React, { useState, useContext } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useQuery, useMutation } from "@apollo/client";

import { Tab,Form, Button, Confirm, Portal, Segment, Header } from "semantic-ui-react";
import  styled from "styled-components";

import { AuthContext } from "../../auth/auth.js";
import { USERSETTINGS, UPDATEUSER,USER, DELETEUSER } from "../../queries/queries";

const title = [
    {key:"0", text:"Dr.", value: "Dr."},
    {key:"1", text:"Mr.", value: "Mr."},
    {key:"2", text:"Mrs.", value: "Mrs."},
    {key:"3", text:"Ms.", value: "Ms."},

]

const ButtonStyled = styled.button`
    height: 2.7rem;
    margin-top: auto!important;
    margin-left: auto!important;
`;

const PortalSegment = styled.div`
    left: 50%;
    position: fixed!important;
    top: 40%;
    transform: translate(-50%, -50%);
    zIndex: 1000;
    padding: 2.6rem!important;
`;

const yupSchema = yup.object().shape({
    title: yup.string().required(),
    firstName: yup.string(),
    lastName: yup.string().required("Last name is Required"),
    password: yup.string().when("confirmPassword",(confirmPassword, field) => 
        confirmPassword ? field.required("Please enter password").min(8, "Password must be at least 8 characters").oneOf([yup.ref("confirmPassword")], "Passwords must match"): field
    ),
    confirmPassword: yup.string().when("password",(password, field) => 
        password ? field.required("Please confirm password").min(8, "Password must be at least 8 characters").oneOf([yup.ref("password")], "Passwords must match"): field
    ),
},[["password", "confirmPassword"]]);


function AccountSettings() {
    const [open, setOpen] = useState(false)
    const [error, setError] = useState({open: false, message:""})

    const context = useContext(AuthContext);
    const { data, loading } = useQuery(USERSETTINGS);
    const [updateUser, {loading: updateLoading }] = useMutation(UPDATEUSER,{
        update(cache, result){
            
            const data = cache.readQuery({ query: USER });

            cache.writeQuery({
                query: USER,
                data: {
                    ...data,
                    getUser:{
                        ...data.getUser,
                        ...result.data.updateUser
                    }
                }
            });

        },
        onError(error){
            setError({open: true, message: error[0].message})
        }
    })

    const deleteConfirm = () => {
        setOpen(!open)
    }

    const [deleteUser, { loading: deleteLoading }] = useMutation(DELETEUSER, {
        update(_,__){
            deleteConfirm()
            context.logout()
        },
        onError(error){
            deleteConfirm()
            setError({open: true, message: error[0].message})

        }
    })
    


    const handleDelete = () => {
        deleteUser();
    }
    
    return (
        <Tab.Pane >
            <Formik
                initialValues={{
                    title : data ? data.getUser.title : "",
                    firstName: data ? data.getUser.firstName : "",
                    lastName : data ? data.getUser.lastName : "",
                    password : "",
                    confirmPassword: "",
                }}
                validationSchema= {yupSchema}
                onSubmit={(values) => {

                    var newValues = {...values}

                    if (newValues.password === "" && newValues.confirmPassword === ""){
                        delete newValues.password
                        delete newValues.confirmPassword
                    }

                    newValues.title === data.getUser.title && delete newValues.title
                    newValues.firstName === data.getUser.firstName && delete newValues.firstName
                    newValues.lastName === data.getUser.lastName && delete newValues.lastName
                    
                    if (Object.keys(newValues).length !== 0){
                        updateUser({ variables: newValues })
                    }
                    
                }}
                enableReinitialize={true}
                validateOnBlur={false}
            >
                { props => {
                    return (
                        <Form>
                            <Form.Group widths="16" unstackable>
        
                                <Form.Select
                                    label="Title"
                                    placeholder="Title"
                                    name="title"
                                    options={title}
                                    value={props.values.title}
                                    onChange={(e,results) => props.setFieldValue("title", results.value)}
                                    fluid
                                />
        
                                <ButtonStyled as={Button} compact size="large" negative onClick={deleteConfirm} disabled={loading || updateLoading || deleteLoading}>
                                    Delete Account
                                </ButtonStyled>
                                <Confirm
                                    open={open}
                                    header="Confirm Delete"
                                    content="Are you sure you want to delete your account?"
                                    confirmButton="Delete"
                                    onCancel={deleteConfirm}
                                    onConfirm={handleDelete}
                                />
                                
                            </Form.Group>
                            <Form.Input
                                label="First Name"
                                placeholder="First Name"
                                name="firstName"
                                type="text"
                                value={props.values.firstName}
                                onChange={props.handleChange}
                            />    
                            
                            <Form.Input
                                label="Last Name"
                                placeholder="Last Name"
                                name="lastName"
                                type="text"
                                value={props.values.lastName}
                                onChange={props.handleChange}
                                error={props.errors.lastName}
                            />
        
                            <Form.Input
                                label="Password"
                                placeholder="Password"
                                name="password"
                                type="password"
                                value={props.values.password}
                                onChange={props.handleChange}
                                error={props.errors.password}
                            />  
        
                            <Form.Input
                                label="Confirm Password"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                value={props.values.confirmPassword}
                                onChange={props.handleChange}
                                error={props.errors.confirmPassword}
                            />        
        
                            <Form.Button 
                                type="submit" 
                                onClick={props.handleSubmit} 
                                color="primary" 
                                disabled={loading || updateLoading}
                            >
                                Submit
                            </Form.Button>
                        </Form>
                    )
                }
                }
            </Formik>
            <Portal onClose={()=>{ setError({...error, open:false})}} open={error.open}>
                <Segment as={PortalSegment}>
                    <Header>{error.message}</Header>
                    <Button
                        content='Close'
                        negative
                        onClick={()=> { setError({message:"", open:false}) }}
                    />
                </Segment>
            </Portal>
        </Tab.Pane>
    )
}

export default AccountSettings;