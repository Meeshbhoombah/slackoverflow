const slack = require('slack');

async function authorizeTeam(clientId, clientSecret, perms) {
  const baseUri = 'http://slack.com/oauth/authorize?'

  return new Promise((resolve, reject) => {
    let uri = baseUri +
      'client_id=' + clientId +
      '&scope=' + perms

    resolve(uri);
  });
};

async function integrateTeam(config, db, accessCode, clientId, clientSecret) {
  return new Promise(async (resolve, reject) => {
    let Team = db.Team;

    await slack.oauth.access({
      client_id:      clientId, 
      client_secret:  clientSecret, 
      code:           accessCode,
      nice:           1
    }) 
    .then(async (res) => {
      // use tranaction for lookup - unsure if team exists
      await db.transaction((t) => {
        return Team.findOrCreate({
          where: {
            id:       res.team_id,
            token:    res.access_token,
            name:     res.team_name,
            chanId:   res.incoming_webhook.channel_id,
            chanName: res.incoming_webhook.channel,
          },
          transaction: t
        })
        .spread((team, created) => { // .findOrCreate returns Promise<Model, boolean>
          const t = team.dataValues;
          const baseUri = 'https://slack.com/app_redirect?' 
          
          let deepLink = baseUri +
              'channel=' + t.chanID +
              '&team=' + t.id

          resolve(deepLink);  
        })
      });
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
