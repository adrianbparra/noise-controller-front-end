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
  getUser{
    email
  	title
    theme
    lastName
    firstName
    createdAt
    micSensitivity
    classes{
      id
      name
      numberOfKids
      theme
      grade
      highestScore
      scores{
        id
        theme
        score
        createdAt
      }
    }
    selectedClass{
      id
      name
      theme
      grade
      numberOfKids
      highestScore
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
  getUser @client{
      lastName
    selectedClass @client{
      id
      name
      theme
      grade
      numberOfKids
    }
  }
}`


export const ADDCLASS = gql`
mutation ADDCLASS($name: String!, $numberOfKids: Int!, $grade: String!, $theme: String){
  addClass(name: $name, numberOfKids: $numberOfKids, grade:$grade, theme: $theme){
    id
    name
    numberOfKids
    theme
    grade
    highestScore
    scores{
      id
      theme
      score
      createdAt
    }
  }
}
`