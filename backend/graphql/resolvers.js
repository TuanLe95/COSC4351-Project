const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function hello(root, args, context, info){
  return {
    text: "text",
    views: 123
  }
}

async function signUp({userSignupInput}, req){
  const name = userSignupInput.name;
  const email = userSignupInput.email;
  const password = userSignupInput.password;
  const role = userSignupInput.role;
  console.log(userSignupInput.role);
  let user = await User.findOne({U_email: email});
  if(user){
    throw new Error("User existed")
  }
  const hashedPass = await bcrypt.hash(password, 12);
  
  let newUser = new User({
    U_name: name,
    U_email: email,
    U_password: hashedPass,
    U_role: role,
  });
  newUser = await newUser.save();
  return {
    token: "token placeholder",
    user: newUser
  }
}

async function logIn({userLoginInput}, req){
  const email = userLoginInput.email;
  const password = userLoginInput.password;
  const user = await User.findOne({U_email: email});
  if(!user){
    throw new Error("User not found");
  }
  
  const isEqual = await bcrypt.compare(password, user.U_password);
  if(!isEqual){
    throw new Error("Incorrect password");
  }
  return {
    token: "token placeholder",
    user: user
  }
}
module.exports = {
  hello,
  logIn,
  signUp,
}