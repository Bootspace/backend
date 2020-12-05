const express = require('express');
const cors =require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


require('dotenv').config();

//Initializing the express App
const app = express();
const port = process.env.PORT || 5000;

const exerciseRouter = require('./routes/exercises');
const userRouter = require('./routes/users');

//Settin up some middlewares
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Connecting to the MongoDB database
const url = process.env.ATLAS_URL;
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB Database succesfully connected');
})

//Linking up our route files
app.use('/exercises', exerciseRouter);
app.use('/users', userRouter);

// Connecting to SErver
app.listen(port,() => {
  console.log(`Server is running on Port: ${port}`);
});