import { Request, Response } from "express";

const jwt = require("jsonwebtoken");
export const auth = async (req: Request, res: Response, next) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];
    const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");

    // retrieve the user details of the logged in user
    // const user = await decodedToken;

    // pass the user down to the endpoints here
    req.user = decodedToken;

    // pass down functionality to the endpoint
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
      error: new Error("Invalid request!"),
    });
  }
};
