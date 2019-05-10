const slack = require('slack');

async function authorizeTeam(clientId, clientSecret, perms) {
  const baseUri = 'http://slack.com/oauth/authorize?'

  return new Promise((resolve, reject) => {
    let uri = baseUri +
      'client_id=' + clientId +
      '&client_secret=' + clientSecret +
      '&scopes=' + perms

    resolve(uri);
  });
};

async function integrateTeam(config, db, accessCode, clientId, clientSecret) {
  const baseUri = 'https://slack.com/app_redirect?' //channel=%s&team=%s

  let Team = db.Team;

  return new Promise(async (resolve, reject) => {
    await slack.oauth.access(clientId, clientSecret, accessCode) 
    .then((res) => {
    })
    .catch((err) => {
      reject(err);
    })
  });
};

module.exports = { 
  authorizeTeam,
  integrateTeam
};
