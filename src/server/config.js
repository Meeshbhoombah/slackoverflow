// TODO: PROD parse DATABASE_URL
// Environment varible keys are in UPPERCASE

const config = {
  env: process.env.NODE_ENV,
  // environment variables are all strings
  port: parseInt(process.env.PORT || 3000),
  // postgres
  db: {
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    name: process.env.DBNAME,
    user: process.env.DBUSER,
    pass: process.env.DBPASS,
  },
};

module.exports = () => {
    return config;
};
