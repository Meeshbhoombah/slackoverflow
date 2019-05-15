const slack = require('slack');

async function userJoinChan(config, db, evt) {
  return new Promise(async (resolve, reject) => {
    const Team = db.Team;
    const Member = db.Member;
    
    let teamId = evt.team;
    let memberId = evt.user;

    Team.findOne({
      where: {
        id: teamId
      },
      include: [{ 
        model: Member,
        as: 'members',
        where: { 
          id: memberId 
        } 
      }]
    })
    .then((team) => {
      console.log(team);
      slack.users.profile.get({
        user: memberId,
        token: team.token
      })
    })
    .then((res) => {
      console.log(res);
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
