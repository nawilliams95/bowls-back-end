const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
     
    }, 
    lastName: {
      type: String,
      
    }, 
    email: {
        type: String,
        
    }, 
    password: {
        type: String,
        
    }, 
    nickname: {
        type: String
    },
    birthday: {
        type: Date
    } 
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;