const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { mongoose } = require('mongoose')

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Connected to database"))
.catch((err) => console.log("Can not connect to database", err))

const app = express();

app.use('/', require('./routes/authRoutes'))
