const parse = require('../controllers/events');

module.exports = (app) => {
  app.post('/event', function(req, res, next) {
      const config = app.config;
      const db = app.db;

      let evt = req.body;

      if (evt.type == 'url_verification') {
        return res.send({ 
          challenge: evt.challenge 
        });
      }

      // get handler for event
      const handle = parse(evt);

      if (handle != undefined) {
        handle(config, db, evt)
        .then((result) => {
          res.send(result);
        })
        .catch((err) => {
          console.error(`🚨 FAILED EVENT ${evt.Type}:`, (err.message || err));
        })
      } else {
        console.error(`🚨 FAILED EVENT ${evt.Type}: No such Event handler.`); 
      }
  });
};
