"use strict";

const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);

const Sequelize = require("sequelize");

// Get the environment that the app is running in OR development
const env = process.env.NODE_ENV || "development";

// config is the object with credentials for the appropriate environment
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

// If config has use_env_variable, use that to create Sequelize object
// If not, create new sequelize object with config credentials
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// For each model file, import that model function and pass in
// It's required arguments to return the object
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    const model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Add the Sequelize package and sequelize object to db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// export db
module.exports = db;
