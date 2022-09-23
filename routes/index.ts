import express, { NextFunction, Request, Response, Router } from "express";
import { signInUser } from "../controllers/sign-in-local";
import { createLocalUser } from "../controllers/signup-local";
import User from "../models/user.model";
import passport from "../passport/signup-google";
// const passport = require("passport");
import localUserStrategy from "../passport/user";
const routes = express.Router();
import { getUsers } from "../controllers/users";
import { auth } from "../auth";
import { getUser } from "../controllers/user";

// For passport local strategy implementation

// routes.post(
//   "/user",
//   passport.authenticate("local-signup", {
//     // successRedirect: "",
//     failureRedirect: "/api",
//   }),
//   (req, res) => {
//     console.log({ req }, "HELP!!");
//     res.send({
//       message: "login",
//     });
//   }
// );

// routes.get('/auth/google', passport.authenticate)
routes.post("/signup", createLocalUser);
routes.get("/user", auth, getUser);
routes.post("/login", signInUser);
routes.get("/users", auth, getUsers);

// routes.get(
//   "/google",
//   passport.authenticate("google", {
//     scope: ["email", "profile"],
//     successRedirect: "/3001",
//     failureRedirect: "/api",
//   })
// );

routes.get("/login/success", (req, res) =>
  res.send({
    message: "ok",
  })
);
routes.get(
  "/login/federated/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

routes.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/api",
    failureRedirect: "/api",
  }),
  (req, res) => {
    console.log("request", { req });
    return res.send({
      message: "ok",
    });
  }
);
export default routes;
