const teams = require('./teams');

module.exports = bind = (app) => {
  // enables Slack OAuth 2.0 installation flow
  teams(app);
}
