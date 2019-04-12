module.exports = (app) => {
  app.listen(process.env.PORT || 8080, (error) => {
    if (error) {
      console.error('Failed to start server:', err) 
    } else {
      console.info('🚀🚀🚀 LISTENING ON PORT:', `${process.env.PORT || 8080}`) 
    }
  });
}
