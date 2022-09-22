import { Request } from "express";
import passport from "passport";
const bCrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
import User from "../models/user.model";

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true, // allows us to pass back the entire request to the callback
    },

    function (req: Request, email: string, password: string, done) {
      const generateHash = (password) => {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
      };
      User.findOne({
        where: {
          email: email,
        },
        attributes: {
          exclude: ["password", "last_login", "createdAt", "updatedAt"],
        },
      }).then(function (user) {
        if (user) {
          return done(null, false, {
            message: "That email is already taken",
          });
        } else {
          var userPassword = generateHash(password);
          var data = {
            email: email,
            password: userPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
          };

          User.create(data)
            .then((newUser) => {
              console.log({ newUser });
              if (!newUser) {
                return done(null, false);
              }
              if (newUser) {
                return done(null, newUser);
              }
            })
            .catch((error) => {
              // res.status(500).send({
              //   message:'failure'
              // })
              console.log(error, "ERRROR");
            });
        }
      });
    }
  )
);
passport.serializeUser(function (user, cb) {
  cb(null, user);
});
//
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

export default passport;
