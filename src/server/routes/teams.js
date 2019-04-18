const slack = require('slack');

const base = 'http://slack.com/oauth/authorize'

module.exports = (app) => {
  const config = app.config;
  const teams = app.db['Teams'];

  // generate Slack oauth url
  app.get('/api/team/authorize', function(req, res, next) {
     
  });

  // exchange access code for Team info, create/push to db, return deep link 
  app.get('/api/team/integrate', function(req, res, next) {
    const code = req.body.code;

    const id = config.slack.client.id;
    const secret = config.slack.client.secret;

    slack.oauth.access(id, secret, code)
    .then((rsp) => {
      console.log(rsp);
    })
    .catch((err) => {
      console.error(`Unable to authorize ${code}:`, err);
    })
  });
};
