const slack = require('slack'); 

async function userJoinChan(config, db, evt) {
  return new Promise(async (resolve, reject) => {
    const Team = db.Team;
    const Member = db.Member;
    
    let teamId = evt.team;
    let memberId = evt.user;
    let channelId = evt.channel;

    Team.findOne({
      where: {
        id: teamId
      },
      include: [{
        model: Member,
        as: 'members',
        where: {
          id: memberId
        },
        required: false
      }]
    })
    .then(async (team) => {
      if (channelId !== team.chanId) {
        throw new Error({ message: `Channel: ${chanId} not initalized` });
      } else if (team.members == undefined || team.members.length == 0) {
        // no existing member matches Member ID/Team ID (therefore new memeber)
        await slack.users.profile.get({
          user: memberId,
          token: team.token
        })
      } else {
        // Member already exists, do nothing, resolve Event
        resolve(team.members);
      }
    })
    .then((res) => {
      Member.create({
        id:         memberId,
        username:   res.display_name,
        name:       res.real_name,
        email:      res.email,
        teamId:     teamId,
      }) 
    })
    .then((member) => {
      // TODO: send onboard message
      console.log(member);
      resolve(member);
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
