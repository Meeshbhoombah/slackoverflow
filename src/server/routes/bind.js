const teams = require('./team');
const events = require('./team');

module.exports = (app) => {
  // enables Slack OAuth 2.0 installation flow
  teams(app);
  // `member-joined-channel`
  events(app);
}
