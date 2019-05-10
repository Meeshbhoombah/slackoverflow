const slack = require('slack');

async function authorizeTeam(clientId, clientSecret, scopes) {
  const baseUri = 'http://slack.com/oauth/authorize?'

  return new Promise((resolve, reject) => {
    resolve(baseUri +
    'client_id=' + clientId +
    '&client_secret=' + clientSecret +
    '&scopes' + scopes);
  });
 };

async function integrateTeam(config, db, accessCode, clientId, clientSecret) {
  return new Promise((resolve, reject) => {
  });
};

module.exports = { 
  authorizeTeam,
  integrateTeam
};
