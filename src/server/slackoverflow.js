const express = require('express');
const app = express();

// load environment variables - postgres, Slack/admin secrets
const config = require('./config')
app.config = config();

// create/update models on postgres database 
const sync = require('./database');
app.db = sync(app);

const serve = require('./server');
serve(app);
