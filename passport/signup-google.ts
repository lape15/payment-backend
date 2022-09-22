import { Request } from "express";
import passport from "passport";
const bCrypt = require("bcryptjs");

const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      //   callbackURL: "/auth/google/callback",
      callbackURL: "http://localhost:4000/auth/google/callback",
      scope: ["profile", "email"],
      passReqToCallback: true,
    },
    function verify(accessToken, refreshToken, issuer, profile, cb) {
      if (profile) {
        // console.log(profile, accessToken);
      }
      profile.accessToken = accessToken;
      return cb(null, profile, accessToken);
    }
  )
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, user);
  });
});
//
passport.deserializeUser(function (obj, cb) {
  process.nextTick(function () {
    cb(null, obj);
  });
});

export default passport;
