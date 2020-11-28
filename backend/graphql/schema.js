const { buildSchema } = require("graphql")

module.exports = buildSchema(`
  type RootQuery{
    hello: TestData
  }  

  type RootMutation{
    signUp(userSignupInput: UserSignupData): AuthPayLoad
    logIn(userLoginInput: UserLoginData): AuthPayLoad
  }
  type User {
    _id: ID!
    U_name: String!
    U_email: String!
    U_password: String
    U_role: [String]
  }
  input UserLoginData{
    email: String!
    password: String!
  }
  input UserSignupData{
    name: String!
    email: String!
    password: String!
    role: [String]
  }
  type AuthPayLoad {
    token: String
    user: User
  }

  type TestData {
    text: String!
    views: Int!
  }
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);