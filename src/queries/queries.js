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
      token
    }
  }
`;


export const SIGN_UP_USER = gql`
  mutation register(
    $email:String!, 
    $title: String!, 
    $firstName: String!, 
    $lastName: String!, 
    $password: String!){

  register(
    registerInput: {
      email : $email, 
      title: $title, 
      firstName: $firstName, 
      lastName: $lastName, 
      password: $password
      }){
      id
      email
      title
      lastName
      token
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


// export const SELECTEDCLASS = gql`{
//   fragment class on selectedClass {
//     id 
//     name 
//     numberOfKids 
//     theme 
//     grade 
//     streak 
//   }
// }`


export const SELECTEDCLASS = gql`
query selectedClass{
  user @client{
      id
    selectedClass @client{
        id 
        name 
        numberOfKids 
        theme 
        grade 
        streak 
    }
  }
}`


export const ADDCLASS = gql`
mutation ADDCLASS($name: String!, $numberOfKids: Int!, $grade: String!, $teacherId: ID!){
  addClass(name: $name, numberOfKids: $numberOfKids, grade:$grade, teacherId: $teacherId){
    id
    name
    numberOfKids
    theme
    grade
    streak
  }
}
`