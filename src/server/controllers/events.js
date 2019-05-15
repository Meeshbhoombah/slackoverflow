const slack = require('slack'); 
async function userJoinChan(config, db, evt) {
  return new Promise(async (resolve, reject) => {
    const Team = db.Team;
    const Member = db.Member;
    
    let team = evt.team;
    let member = evt.user;

    Member.findOrCreate({
      where: {
        id: member,
        teamId: team
      },
      include: [{
        model: Team,
        as: 'team'
      }]
    })
    .spread(async (query, created) => {
      if (created) {
        console.log(query);

        await slack.users.profile.get({ 
          user: member,
          token: query.team.token
        })
      } else {
        resolve(query);
      }
    })
    .then((res) => {
      Member.update({
        where: {
          id: member,
          teamId: team
        },
        fields: {
          username: res.display_name,
          name: res.real_name,
          email: res.email
        }
      }); 
    })
    .catch((err) => {
      reject(err);
    });
  });
};

module.exports = (evt) => {
  handlers = {
    'member_joined_channel': userJoinChan
  };

  return handlers[evt.type]
};
