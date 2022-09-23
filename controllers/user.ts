import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";

export const getUser = async (req: Request, res: Response) => {
  const reqUser = req.user;
  try {
    const user = await User.findOne({
      where: {
        email: req.user["userEmail"],
      },
      attributes: {
        exclude: ["password", "updatedAt", "status", "createdAt", "last_login"],
      },
    });
    if (user)
      return res.status(200).send({
        data: user,
      });
  } catch (err) {
    res.status(500).send("error");
    console.log(err);
  }
};
