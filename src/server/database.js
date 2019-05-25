const sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

const modelsPath = path.normalize(`${__dirname}/models`);

function marshal(config) {
  return {
    dialect: 'postgres',
    host: config.db.host,
    port: config.db.port,
  };
};

function init(config, opts) {
  const db = new sequelize(
    config.db.name,
    config.db.user,
    config.db.pass,
    opts
  )

  fs.readdirSync(modelsPath)
  .filter(file => (file.indexOf('.') !== 0) && (file.indexOf('.map') === -1))
  .forEach((file) => {
    console.info(`⏳ LOAD models/${file}`);

    var model = db['import'](path.join(modelsPath, file));
    db[model.name] = model;

    console.info(`✅ LOAD models/${file}`);
  })

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  return db
};

module.exports = (app) => {
  const config = app.config;
  // initalize sequelize with options from config 
  const opts = marshal(config);

  // import models and sync to database
  const db = init(config, opts);

  return db
};
