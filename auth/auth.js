const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../model/user');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.create({email, password})
        return done(null, user)
      } catch (error) {
        done(error)
      }
    }
  )
)

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({email})
        if (!user) {
          return done(null, false, {message: 'User not found'})
        }
        const validate = await user.isValidPassword(password)
        if (!validate) {
          return done(null, false, {message: 'Invalid Username or Password'})
        }
        return done(null, user, {message: 'Logged in successfully'})
      } catch (error) {
        done(error)
      }
    }
  )
)

passport.use(
  new JWTStrategy(
    {
      secretOrKey: process.env.JWT_SECRET_KEY,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

