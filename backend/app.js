const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const {graphqlHTTP} = require("express-graphql");
const app = express();
const graphQlSchema = require("./graphql/schema")
const graphQlResolvers = require("./graphql/resolvers")

const mongooseConnectionString = "mongodb+srv://DBSuser:DBSuser@cluster0.7ldea.mongodb.net/COSC4351?retryWrites=true&w=majority"

app.use(bodyParser.json());
app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if(req.method === "OPTIONS"){
    return res.sendStatus(200);
  }
  next();
})



app.use("/graphql", graphqlHTTP({
  schema: graphQlSchema,
  rootValue: graphQlResolvers,
  graphiql: true,
}));

mongoose.connect(mongooseConnectionString,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
  app.listen(8080, () => console.log("Server is listening on port 8080"));
})
