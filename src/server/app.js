/*
 *
 * slackoverflow.js
 * - inits app
 * - loads config
 * - syncs database
 * - serves static frontend
 * - serve api (Slack OAuth 2.0)
 *
 */

const express = require('express');
const app = express();

// load env vars - pg, Slack/admin secrets
const config = require('./config')
app.config = config();

// configure orm, attach pg db, import models
const database = require('./database');
app.db = database(app);

const bind = require('./routes/bind');
bind(app);

// connect to pg db, create/update models 
app.db.sync()
.then(() => {
  console.log('✅ DATABASE SYNC');
  app.listen(app.config.port || 8080, (error) => {
    if (error) {
      console.error('Failed to start server:', err);
    } else {
      console.info('🚀🚀🚀 LISTENING ON PORT:', `${app.config.port || 8080}`);
    }
  });
})
.catch((err) => {
  console.error('Unable to sync with Postgres database:', err);
});
