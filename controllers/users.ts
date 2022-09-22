import User from "../models/user.model";
import { NextFunction, Request, Response } from "express";

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll({
    attributes: {
      exclude: ["password", "last_login", "createdAt", "updatedAt"],
    },
  });
  return res.status(200).send({
    message: "Ok",
    data: users,
  });
};
