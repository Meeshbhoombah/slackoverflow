function memberJoinedChannel(config, db, evt) {
  console.log('Test');
}

module.exports = (evt) => {
  handlers = {
    'member_joined_channel': memberJoinedChannel
  };

  return handlers[evt.type]
}
