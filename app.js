/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { router } = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('Connected');
  })
  .catch((err) => {
    console.error(err);
  });

app.use((req, res, next) => {
  req.user = {
    _id: '640079983388d238e9c49910',
  };
  next();
});

app.use('/', router);

app.use((err, req, res, next) => {
  const { statusCode } = err;
  if (statusCode === 500) {
    res.status(500).send({ message: err.message });
    next();
  } else {
    res.status(statusCode).send({ message: err.message });
    next();
  }
});

app.listen(PORT);
