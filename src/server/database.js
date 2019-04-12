const sequelize = require('sequelize');

function marshal(config) {
  return {
    dialect: 'postgres',
    host: config.db.host,
    port: config.db.port,
  };
};

async function sync(config, opts) {
  const db = new sequelize(
    config.db.name,
    config.db.user,
    config.db.pass,
    opts
  )

  await db.sync()
  .then((sync) => {
    console.log('✅ DATABASE SYNC');
    return db
  })
  .catch((err) => {
    console.error('Unable to sync with Postgres database:', err);
  });
};


module.exports = (app) => {
  console.info("⏳ DATABASE SYNC");

  const config = app.config;
  // initalize sequelize with options from config 
  const opts = marshal(config);

  // sync models to database
  const db = sync(config, opts);
  return db
};
