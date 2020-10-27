const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  U_name:{
    type: String,
    required: true,
  },
  U_email:{
    type: String,
    required: true,
  },
  U_password:{
    type:String,
    required: true,
  },
  U_role: {
    type: String,
  }
});

module.exports = mongoose.model("User", userSchema);

