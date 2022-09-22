import express, { NextFunction, Request, Response } from "express";
// const bodyParser = require("body-parser");

import cors from "cors";
import morgan from "morgan";
require("dotenv").config();

import routes from "./routes";
// import passport from "passport";
import passport from "./passport/signup-google";
import session from "express-session";

// import User from "./models/test.model";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use((req: Request, res: Response, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.json());

app.use("/", routes);
app.get("/api", (req, res) => {
  return res.send({
    message: "fallback",
  });
});
app.get("/", function (req, res) {
  res.send({ message: "Connected to base" });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  next();
});

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
// app.use(bodyParser.json());

// db.sequilize
//   .sync({ force: true })
//   .then(() => console.log("DB is synced"))
//   .catch((err) => console.log(err, "error here ", err.message));
app.use(passport.initialize());
app.use(passport.session());
export default app;
