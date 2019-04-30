const parse = require('../controllers/events');

module.exports = (app) => {
  const config = app.config;
  const db = app.db;

  app.post('/event', function(req, res, next) {
      const evt = req.body;

      if (evt.type) {
        // get handler for event
        const handle = parse(evt);

        if (handle != undefined) {
          // handle event
          handle(config, db, evt);        
        } else {
          next(); 
        }
      } else {
        next(); 
      }
  });
};
