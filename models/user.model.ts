import { Sequelize, DataTypes, Model } from "sequelize";
import db from "./index";

// const passportLocalMongoose = require("passport-local-mongoose");

class User extends Model {}

User.init(
  {
    // Model attributes are defined here
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    email: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    last_login: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },

    // debitHistory: {
    //   type: DataTypes.ARRAY(DataTypes.STRING),
    //   defaultValue: [],
    // },
    // creditHistory: {
    //   type: DataTypes.ARRAY(DataTypes.STRING),
    //   defaultValue: [],
    // },
  },

  {
    // Other model options go here
    sequelize: db.sequilize, // We need to pass the connection instance
    modelName: "User", // We need to choose the model name
  }
);

export default User;
