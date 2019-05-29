module.exports = (app) => {
  app.all('/', function(req, res, next) {
    res.render('index.html');
  });
};
