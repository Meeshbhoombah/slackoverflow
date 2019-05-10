const slack = require('slack');

async function authorizeTeam(clientId, clientSecret, scopes) {
  const baseUri = 'http://slack.com/oauth/authorize?'

  return new Promise((resolve, reject) => {
    const uri = baseUri +
      'client_id=' + clientId +
      '&client_secret=' + clientSecret +
      '&scopes' + scopes

    resolve(uri);
  });
 };

async function integrateTeam(config, db, accessCode, clientId, clientSecret) {
  const baseUri = 'https://slack.com/app_redirect?' //channel=%s&team=%s

  return new Promise(async (resolve, reject) => {
    await slack.oauth.access(clientId, clientSecret, accessCode) 
    .then((res) => {
      console.log(res.access_token);
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
