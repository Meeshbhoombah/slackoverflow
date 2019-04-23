const oauth = require('./oauth');
const events = require('./event');

module.exports = (app) => {
  // enables Slack OAuth 2.0 installation flow
  oauth(app);
  // handle events
  events(app);
}
