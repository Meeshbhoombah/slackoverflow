const slack = require('slack');

async function authorizeTeam(clientId, clientSecret, perms) {
  const baseUri = 'http://slack.com/oauth/authorize?'

  return new Promise((resolve, reject) => {
    let uri = baseUri +
      'client_id=' + clientId +
      '&client_secret=' + clientSecret +
      '&scope=' + perms

    resolve(uri);
  });
};

async function integrateTeam(config, db, accessCode, clientId, clientSecret) {
  const baseUri = 'https://slack.com/app_redirect?' //channel=%s&team=%s

  return new Promise((resolve, reject) => {
    let Team = db.Team;

    slack.oauth.access({
      client_id: clientId, 
      client_secret: clientSecret, 
      code: accessCode,
      nice: 1
    }) 
    .then((res) => {
      console.log(Team);
      console.log(res);
    })
    .catch((err) => {
      reject(err);
    });
  });
};

module.exports = { 
  authorizeTeam,
  integrateTeam
};
