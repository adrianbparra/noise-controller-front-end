import {gql} from "@apollo/client"


export const GET_CLASSES = gql`
  { 
    classes{
      name
      numberOfKids
      theme
    }
  }
`;


export const LOGIN_USER = gql`
mutation LOGIN($email: String!, $password: String!){
    login(email:$email, password: $password){
      id
      email
      title
      lastName
      
    }
  }
`;


export const SIGN_UP_USER = gql`
mutation SIGN_UP($email:String!, $firstName: String!, $lastName: String!, $title: String!, $password: String!){

    addUser(email : $email, firstName: $firstName, lastName: $lastName, title: $title, password: $password){
      id
      email
      lastName
    }
  }
`


export const USER = gql`
query USER{
  user{
    id
    email
    firstName
    lastName
    title
    micSensitivity
    theme
    classes{
      id
      name
      numberOfKids
      theme
      grade
      streak
    }
    selectedClass{
      id
      name
      numberOfKids
      theme
      grade
      streak
    }
  }
}
`


export const SELECTEDCLASS = gql`
query selectedClass{
  user @client{
    selectedClass @client{
        id 
        name 
        numberOfKids 
        theme 
        grade 
        streak 
    }
  }
}

`