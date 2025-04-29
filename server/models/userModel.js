const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true, 
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, 
  },
  password: {
    type: String,
    required: true,
    minlength: 6, 
    },
  profilePic: {
  type: String,
  default: "", 
},
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true }); 

const User = mongoose.model("User", userSchema)
module.exports = User
