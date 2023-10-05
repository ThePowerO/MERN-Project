const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { mongoose } = require('mongoose')

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Connected to database"))
