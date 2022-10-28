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

// initiate the express app
const app = express()

// middlewares
require('./auth/auth');
app.use(express.json());
// to serve the client app
app.use(express.static(path.join(__dirname, './client-app/out')));
// to access public routes
app.use('/api', loginSignupRoute);
// user route
app.use(
  '/api/user',
  passport.authenticate('jwt', { session: false }),
  userRoute
);

// docs route
app.use(
  '/api/docs',
  passport.authenticate('jwt', { session: false }),
  docsRoute
);

// Handle errors.
app.use(function(err, req, res, next) {
  console.log(err)
  res.status(err.status || 500);
  res.json({ error: err });
});

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, './client-app/out/index.html'));
});

app.get('/api/countries.json', (req, res) => {
  return res.sendFile(path.join(__dirname, './src/assets', 'countries.json'))
})



app.listen(port, () => {
    console.log(`Galaxy Node app is listening at http://${host}:${port}`)
})
