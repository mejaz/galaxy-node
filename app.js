// as dotenv is a dev dependency, putting a check for production
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// connect to the db
require("./db").connect()

const express = require('express')
const path = require('path');
const passport = require('passport');
const host = process.env.APP_HOST
const port = process.env.APP_PORT

// routes
const loginSignupRoute = require('./routes/login-signup');
const userRoute = require('./routes/user');
const docsRoute = require('./routes/docs');
const dnsRoute = require('./routes/dns');

// initiate the express app
const app = express()

// middlewares
require('./auth/auth');
const CertsModel = require("./model/certs");
const mongoose = require("mongoose");
const moment = require("moment");

app.use(express.json());
// to serve the client app
app.use(express.static(path.join(__dirname, './client-app/out')));
// app.use(express.static(path.join(__dirname, './certificates')));
// to access public routes
app.use('/api', loginSignupRoute);
// user route
app.use(
  '/api/user',
  passport.authenticate('jwt', {session: false}),
  userRoute
);

// docs route
app.use(
  '/api/docs',
  passport.authenticate('jwt', {session: false}),
  docsRoute
);

// designation route
app.use(
  '/api/designations',
  passport.authenticate('jwt', {session: false}),
  dnsRoute
);

// Handle errors.
app.use(function (err, req, res, next) {
  console.log(err)
  res.status(err.status || 500);
  res.json({error: err});
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './client-app/out/index.html'));
});

app.get('/api/countries.json', (req, res) => {
  return res.sendFile(path.join(__dirname, './src/assets', 'countries.json'))
})


app.post(
  '/api/public/docs/:id/verify',
  async (req, res) => {
    const {lastName, dob} = req.body
    const {id} = req.params

    let cert = mongoose.isValidObjectId(id) ? await CertsModel.findById(id).populate('issuedTo') : null

    if (!cert) {
      return res.status(400).json({success: false, message: 'invalid request'})
    }

    if (cert.issuedTo.lastName.toLowerCase() === lastName.toLowerCase()
      && moment(cert.issuedTo.dob).format("MMDDYYYY") === moment(dob).format("MMDDYYYY")) {
      if (cert.certSignedPath) {
        return res.status(201).sendFile(path.join(__dirname,`${cert.certSignedPath}`))
      } else {
        return res.status(400).json({success: false, message: 'signed document not available'})
      }
    } else {
      return res.status(400).json({success: false, message: 'invalid request'})
    }
  }
)


app.listen(port, () => {
  console.log(`Galaxy Node app is listening at http://${host}:${port}`)
})
