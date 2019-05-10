const oauth = require('../controllers/oauth');

module.exports = (app) => {
  // generate Slack oauth url
  app.get('/api/team/authorize', function(req, res, next) {
    const config = app.config;

    let clientId = config.slack.id;
    let clientSecret = config.slack.secret;
    let perms = config.slack.scopes;

    oauth.authorizeTeam(clientId, clientSecret, perms)
    .then((url) => {
      console.log(url);
      res.send(url);
    })
    .catch((err) => {
      console.error(`🚨 FAILED Authorize`, (err.messages || err));
    });
  });

  // exchange access code for Team info, create/push to db, return deep link 
  app.post('/api/team/integrate', function(req, res, next) {
    const config = app.config;
    const db = app.db;

    let accessCode = req.body.code;

    if (accessCode !== null) {
      let clientId = config.slack.id;
      let clientSecret = config.slack.secret;

      oauth.integrateTeam(config, db, accessCode, clientId, clientSecret) 
      .then((deepLink) => {
        res.send(deepLink);
      })
      .catch((err) => {
        console.error(`🚨 FAILED Integrate ${accessCode}:`, (err.messages || err));
      });
    } else {
        console.error(`🚨 FAILED Integrate ${accessCode}:`, (err.messages || err));   
    }
  });
};
