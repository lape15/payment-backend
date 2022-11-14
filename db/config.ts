/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  development: {
    dialect: "mysql",
    HOST: "localhost",
    port: 3306,
    username: "testuser",
    password: "goodgirl",
    database: "testdb",
    logging: false,
    define: {
      underscored: true,
    },
    // synchronize: true, //
    autoLoadModels: true,
    seederStorage: "sequelize",
    seederStorageTableName: "sequelize_seeder",
  },
  test: {
    dialect: "mysql",
    name: "hifast_test",
    database: "hifast_test",
    storage: "./db.sqlite",
    synchronize: false,
    // autoLoadModels: true,
    // logging: true,
    dialectOptions: {
      filename: "./db.sqlite",
    },
  },

  production: {
    dialect: "mysql",
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT
      ? parseFloat(process.env.DATABASE_PORT)
      : 3306,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    logging: false,
    define: {
      underscored: true,
    },
    ssl: true,
    // synchronize: true, //
    autoLoadModels: true,
    seederStorage: "sequelize",
    seederStorageTableName: "sequelize_seeder",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 10000,
    },
  },
};
