import { NextFunction, Request, Response } from "express";

export const findOne = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({
    message: "hello there",
  });
};

export const update = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({
    message: "hello there",
  });
};

export const deleteOne = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({
    message: "hello there",
  });
};

export const deleteAll = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({
    message: "hello there",
  });
};
