const parse = require('../controllers/events');

module.exports = (app) => {
  app.post('/event', function(req, res, next) {
      const config = app.config;
      const db = app.db;

      let evt = req.body;

      if (evt.type) {
        // get handler for event
        const handle = parse(evt);

        if (handle != undefined) {
          handle(config, db, evt)
          .then((result) => {
            res.send(result);
          })
          .catch((err) => {
            console.error(`🚨 FAILED EVENT ${evt.Type}:`, (err.messages || err));
          })
        } else {
          console.error(`🚨 FAILED EVENT ${evt.Type}: No such Event handler.`); 
        }
      } else {
        console.error(`🚨 FAILED EVENT: Request does not contain Event type.`);
      }
  });
};
