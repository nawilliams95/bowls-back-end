const express = require('express')
const UserRouter = express.Router();
const jwt = require('jwt-simple');// creates tokens for useres when they sign in 
const bcrypt = require('bcrypt'); //hashes passowerd what will store in our database
const passport = require('../config/passport');
const config = require('../config/config');
const User = require('../models/users');


//User create route aka sign-up/// 

UserRouter.post("/signup", (req, res) => {
  console.log(req.body);
  if (req.body.email && req.body.password) {

    // Hash the password:
    req.body.password = bcrypt.hashSync(
      req.body.password,
      bcrypt.genSaltSync(10)
    );

    User.findOne({ email: req.body.email }, (user) => {
      console.log("========findOne=======", user);
      if (!user) {
        console.log("Running create user");
        User.create(req.body, (error) => {
          let createdUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nickname: req.body.nickname,
            birthday: req.body.birthday,
            password: req.body.password,
            email: req.body.email
          }
          console.log("createdUser", createdUser);
          console.log("error", error);
          if (createdUser) {
            let payload = { //sends, email, name, id, date account created, and birthday 
              email: createdUser.email,
              name: createdUser.nickname || createdUser.firstName,
              iat: Date().toString(),
              birthday: createdUser.birthday || 'when is your birthday'
            };
            console.log(payload);
            let token = jwt.encode(payload, config.jwtSecret);
            console.log(token);
            res.json({
              token: token,
              currentUser: payload
            });
          } else {
            console.log("failed to create user");
            res.sendStatus(401);
          }
        });
      } else {
        console.log("User already exists, try logging in instead");
        res.sendStatus(401);
      }
    });
  } else {
    res.sendStatus(401);
  }
});

//User sign-in route// 
UserRouter.post("/login", (req, res) => {
  if (req.body.email && req.body.password) {
    console.log(req.body.email);
    User.findOne({ email: req.body.email }, (error, user) => {
      if (error) console.log(error);
      if (user) {
        console.log("Found user. Checking password...");
        if (bcrypt.compareSync(req.body.password, user.password)) {
          console.log("Password correct, generating JWT...");
          let payload = { //sends, email, name, id, date account created, and birthday 
            id: user.id,
            email: user.email,
            name: user.nickname || user.firstName,
            iat: Date().toString(),
            birthday: user.birthday || 'when is your birthday'
          };
          let token = jwt.encode(payload, config.jwtSecret);
          console.log(token);
          res.json({
            token: token,
            currentUser: payload
          });
        } else {
          console.log("Wrong password");
          res.sendStatus(401);
        }
      } else {
        console.log("Couldn't find user. Try signing up.");
        res.sendStatus(401);
      }
    });
  } else {
    res.sendStatus(401);
  }
});

module.exports = UserRouter