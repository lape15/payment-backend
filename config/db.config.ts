module.exports = {
  HOST: "localhost",
  USER: "testuser",
  PASSWORD: "goodgirl",
  DB: "testdb",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
