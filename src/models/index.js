"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
require("dotenv").config();
// const env = process.env.NODE_ENV || "development";
// const config = require(__dirname + "/../database.js")[env];
// console.log("config_use_env_variable:", config.use_env_variable);
// console.log("config", config);
const db = {};

let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config
//   );
// }

if (process.env.NODE_ENV === "production") {
  sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_BRONZE_URL);
} else {
  sequelize = new Sequelize(
    process.env.DATABASE || "oneroute-messaging_db",
    process.env.DB_USERNAME || "postgres",
    process.env.PASSWORD || "alao1996",
    {
      host: process.env.HOST || "localhost",
      dialect: "postgres",
      pool: {
        max: 100,
        min: 0,
        idle: 200000,
        acquire: 1000000,
      },
    }
  );
}

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
