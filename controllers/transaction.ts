import { Request, Response } from "express";
import User from "../models/user.model";

export const transaction = async (req: Request, res: Response) => {
  const trancDetails = req.body;
  if (!trancDetails.amount) {
    return res.status(500).send({
      message: "Amount must be specified dawg!",
    });
  }
  try {
    const accounts = await User.findAll({
      where: {
        id: [trancDetails.creditorId, trancDetails.debitorId],
        status: "active",
      },
    });

    const credtAcct = accounts[0].getDataValue("balance");
    const debitorAcct = accounts[1].getDataValue("balance");
    if (trancDetails.amount > credtAcct) {
      return res.status(500).send({
        message: " Insufficient balance!",
      });
    }
    const newCred = credtAcct - Number(trancDetails.amount);
    const newDebit = Number(debitorAcct + trancDetails.amount);

    try {
      await Promise.all([
        accounts[0].update({ balance: newCred }),
        accounts[0].save(),
        accounts[1].update({ balance: newDebit }),
        accounts[1].save(),
      ]);
      res.status(200).send("Done!");
    } catch (err) {
      res.status(500).send("Ahh  dawg!");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "This shit be crazy",
    });
  }
};
