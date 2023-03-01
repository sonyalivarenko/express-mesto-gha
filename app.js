/* eslint-disable no-unused-vars */
const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb ');

app.use('/user', require('./routes/users'));

app.listen(PORT);
