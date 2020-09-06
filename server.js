//////////////////////////////////////
// DEPENDINCES
/////////////////////////////////////

require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const mongoose = require('mongoose');
const path = require('path');
const cors = require("cors");
const passport = require('./config/passport')();
const userController = require('./controllers/users.js');



//////////////////////////////////////
// MIDDLEWARE
/////////////////////////////////////

// app.use(passport.initialize());
app.use(cors());
app.use(express.json());

//////////////////////////////////////
// MONGO CONNECTION
/////////////////////////////////////

const mongoURI = process.env.MONGO_URI

// mongoose connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

//=============Open the connection===========//
db.on('open', () => {
    console.log('Connection made!--Soul mates??');
});

//////////////////////////////////////
// CONTROLLERS
/////////////////////////////////////

/*TEST*/
// app.get('/test', (req, res)=>{
// 	res.status(200).json({
// 		website: 'My Website',
// 		info: 'Why you being nosey??'
// 	})
// })
// app.use('/api', require(>>controller file here<<))
app.use('/users', userController);

/////>>>>---To make React-Router Work-----<<<</////

app.use('/:id/', express.static('public'))


app.get('*', (req, res)=>{
  res.sendFile(path.resolve(`${__dirname}/public/index.html`));
})



//////////////////////////////////////
// LISTENERS
/////////////////////////////////////
app.listen(PORT, () => {
    console.log(` Big Brother is listening.....on port ${PORT}`);
});

//==============Listeners for Mongoose=============//
db.on('error', (err) => console.log(err.message + ' is MongoD not running?--Check yo self b4 you wreck yo self!'));
db.on('connected', () => console.log('Mongo has arrived: You know where I am :*'));
db.on('disconnected', () => console.log('Mongo has left the building....'));

//NO Errors Whoo-Hoo---
