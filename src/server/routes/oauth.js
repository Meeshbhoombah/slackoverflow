const oauth = require('../controllers/oauth');

module.exports = (app) => {
  // generate Slack oauth url
  app.get('/api/team/authorize', function(req, res, next) {
    const config = app.config;

    let id = config.slack.id;
    let secret = config.slack.secret;
    let scopes = config.slack.scopes;

    oauth.authorizeTeam(id, secret, scopes)
    .then((url) => {
        console.log(url);
        res.send(url);
    })
    .catch((err) => {
      console.error(`Unable to authorize ${code}:`, (err.messages || err));
    });
  });

  // exchange access code for Team info, create/push to db, return deep link 
  app.post('/api/team/integrate', function(req, res, next) {
    const config = app.config;
    const db = app.db;

    let code = req.body.code;
    let id = config.slack.id;
    let secret = config.slack.secret;

    oauth.integrateTeam(config, db, code, id, secret)
    .then((deepLink) => {
      res.send(deepLink);
    })
    .catch((err) => {
      console.error(`Unable to authorize ${code}:`, (err.messages || err));
    });
  });
};
