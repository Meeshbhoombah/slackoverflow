function member_joined_channel(evt) {
  console.log('Test');
}

handlers = {
  'member_joined_channel': member_joined_channel
};

module.exports = (app) => {
  app.get('/event', function(req, res, next) {
  
  });
};
