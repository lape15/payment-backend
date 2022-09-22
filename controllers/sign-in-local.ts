import { Request, Response } from "express";
import User from "../models/user.model";
const bCrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export const signInUser = async (req: Request, res: Response) => {
  if (!req.body.email) {
    return res.send({
      message: "",
    });
  }

  if (req.body.email) {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (!user)
        return res.status(404).send({ message: "User does not exist!" });

      try {
        const isValid = await bCrypt.compare(
          req.body.password,
          user.getDataValue("password")
        );

        if (isValid) {
          //   create JWT token
          const token = jwt.sign(
            {
              userId: user.getDataValue("id"),
              userEmail: user.getDataValue("email"),
            },
            "RANDOM-TOKEN",
            { expiresIn: 84600 }
          );
          return res.status(200).send({
            message: " ok",
            data: {
              userId: user.getDataValue("id"),
              userEmail: user.getDataValue("email"),
              firstName: user.getDataValue("firstName"),
              lastName: user.getDataValue("lastName"),
            },
            token,
          });
        }
      } catch (err) {
        return res.status(500);
      }
    } catch (err) {
      console.log(err);
      res.status(500);
    }
  }
};
