const teams = require('./teams');
const events = require('./events');

module.exports = (app) => {
  // enables Slack OAuth 2.0 installation flow
  teams(app);
  // `member-joined-channel`
  events(app);

  // catch all error handler
  app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500)
    res.render('500')
  });

};
