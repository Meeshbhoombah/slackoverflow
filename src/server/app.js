/*
 *
 * slackoverflow.js - start script
 * + inits app
 * + loads config
 * + syncs database
 * + serves static frontend
 * + serve api (Slack OAuth 2.0)
 * + listen Slack events
 *
 */

const express = require('express');
const app = express();

// load env vars - pg, Slack/admin secrets
const config = require('./config');
app.config = config();

console.log('⏳ BUILD SLACKOVERFLOW WITH CONFIG:');
console.log(app.config);

// handle JSON body
app.use(express.json());

// configure orm, attach pg db, import models
const database = require('./database');
app.db = database(app);

// attach routes - oauth, events
const bind = require('./routes/bind');
bind(app);

console.log('✅ BUILD SLACKOVERFLOW');

console.log('⏳ DATABASE SYNC');
// connect to pg db, create/update models
app.db.sync()
.then(async () => {
  const db = app.db;

  // initalize database with roles
  const seed = require('./seed');
  return await seed(db);
})
.then((didSeed) => {
  if (didSeed) {
    console.log('🌱 SEEDED DATABASE');
  }

  console.log('✅ DATABASE SYNC');

  app.listen(app.config.port || 8080, (error) => {
    if (error) {
      console.error('🚨 FAILED START SERVER:', err);
    } else {
      console.info('🚀🚀🚀 LISTENING ON PORT:', `${app.config.port || 8080}`);
    }
  });
})
.catch((err) => {
  console.error('🚨 FAILED DATABASE SYNC AND SEED:', err);
});

// testing
module.exports = app;
