const slack = require('slack'); 
const onboardMsg = require('../messages/onboard');

const Token = require('../utils').Token;

async function userJoinChan(config, db, evt) {
  return new Promise(async (resolve, reject) => {
    const Team = db.Team;
    const Member = db.Member;
    
    let teamId = evt.team_id;
    let memberId = evt.event.user;
    let channelId = evt.event.channel;

    await Team.findOne({
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
      getToken = Token(team.token);
      
      if (channelId !== team.chanId) {
        throw new Error({ message: `Channel: ${chanId} not initalized` });
      } else if (team.members == undefined || team.members.length == 0) {
        // no existing member matches Member ID/Team ID (therefore new member)
        return await slack.users.profile.get({
          user: memberId,
          token: getToken()
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
    .then(async (member) => {
      // send onboard message 
      const Role = db.Role;

      return await onboardMsg(member, Role);
    })
    .spread(async (msg, attachment) => {
      console.log(msg, attachment);
      console.log(member);
      return await slack.chat.postMessage({
        token: getToken(), 
        channel: member.id, 
        text: msg,
        attchments: attachment
      });
    })
    .then((res) => {
      console.log(res);
      resolve(200);
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
