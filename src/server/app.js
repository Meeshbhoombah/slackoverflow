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

// load environment variables - postgres, Slack/admin secrets
const config = require('./config')
app.config = config();

// create/update models on postgres database 
const database = require('./database');
app.db = database(app);

const bind = require('./routes/bind');
bind(app);

app.listen(app.config.port || 8080, (error) => {
  if (error) {
    console.error('Failed to start server:', err);
  } else {
    console.info('🚀🚀🚀 LISTENING ON PORT:', `${app.config.port || 8080}`);
  }
});
