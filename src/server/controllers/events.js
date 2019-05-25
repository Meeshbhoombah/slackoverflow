const slack = require('slack'); 
// const createOnboardMessage = require('../messages/onboard');

async function userJoinChan(config, db, evt) {
  return new Promise(async (resolve, reject) => {
    const Team = db.Team;
    const Member = db.Member;
    
    let teamId = evt.team_id;
    let memberId = evt.event.user;
    let channelId = evt.event.channel;

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
        // no existing member matches Member ID/Team ID (therefore new member)
        return await slack.users.profile.get({
          user: memberId,
          token: team.token
        });
      } else {
        // Member already exists, do nothing, return existing member 
        return resolve(team.members);
      }
    })
    .then(async (res) => {
      return await Member.create({
        id:         memberId,
        username:   res.profile.display_name,
        name:       res.profile.real_name,
        email:      res.profile.email,
        teamId:     teamId,
      }) 
    })
    .then((member) => {
      /*
      TODO: send onboard message 
      let msg = createOnboardMessage(member);
      */
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

  return handlers[evt.event.type]
};
