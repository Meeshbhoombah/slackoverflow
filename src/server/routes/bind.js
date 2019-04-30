const teams = require('./teams');
const events = require('./events');

module.exports = (app) => {
  // enables Slack OAuth 2.0 installation flow
  teams(app);
  // `member-joined-channel`
  events(app);
}
