function userJoinChan(config, db, evt) {
  console.log('MEMBER JOINED CHANNEL')
};

module.exports = (evt) => {
  handlers = {
    'member_joined_channel': userJoinChan
  };

  return handlers[evt.type]
};
