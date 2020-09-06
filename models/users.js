const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    }, 
    lastName: {
      type: String,
      required: true
    }, 
    email: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true,
    }, 
    nickname: {
        type: String
    },
    birthday: {
        type: String
    } 
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;