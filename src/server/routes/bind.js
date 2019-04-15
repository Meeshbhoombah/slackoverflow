const team = require('./team');

module.exports = (app) => {
  app.use('/team', team);
}
