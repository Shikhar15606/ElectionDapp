const express = require('express');
const path = require('path');
const cors = require('cors');
const logger = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { init, registrationListener, voteListener } = require('./eventListener');
require('dotenv').config();

var app = express();

const connectWithRetry = (uris, options = {}, maxAttempts = 5) => {
  connectWithRetry.timeout = connectWithRetry.timeout || 0;
  return mongoose.connect(uris, options, err => {
    if (err)
      if (connectWithRetry.timeout <= (maxAttempts - 1) * 5000) {
        console.error(
          `Failed to connect to mongo on startup - retrying in ${
            (connectWithRetry.timeout += 5000) / 1000
          } sec`,
          connectWithRetry.previousError != '' + err
            ? `\n${(connectWithRetry.previousError = err)}`
            : ''
        );
        setTimeout(connectWithRetry, connectWithRetry.timeout, uris, options);
      } else process.exit(1);
    else console.log('Connected to MongoDB successfully!');
  });
};

connectWithRetry(process.env.DB_URI);

init()
  .then(() => {
    console.log('Connected to blockchain successfully!');
    registrationListener();
    voteListener();
  })
  .catch(err => {
    console.log('Unable to connect to blockchain', err);
  });

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST'],
    credentials: true,
  })
);
app.set('trust proxy', 1);
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use('/api', require('./routes/api'));
app.use('/auth', require('./routes/auth'));

if (process.env.NODE_ENV === 'development') {
  app.use('/dev', require('./routes/dev'));
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});

module.exports = app;
