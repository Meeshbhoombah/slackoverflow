const teams = require('./team');

module.exports = bind = (app) => {
  // enables Slack OAuth 2.0 installation flow
  teams(app);
}
