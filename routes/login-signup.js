const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post(
  '/login',
  async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          if (err || !user) {
            return res.status(401).json({ info });
          }

          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);

              const body = { _id: user._id, email: user.email };
              const token = jwt.sign({
                user: body,
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)  // 24 hr token
              }, process.env.JWT_SECRET_KEY);
              return res.status(201).json({ token, company: user.company.shortName });
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);

router.get('/verify-token', passport.authenticate('jwt', { session: false }), (req,res) => {
  res.send({success: true});
});

module.exports = router;