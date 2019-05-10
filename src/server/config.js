// TODO: PROD parse DATABASE_URL
// TODO: Load .env file if not loaded
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
  slack: {
    id:  process.env.SLACK_CLIENT_ID,   
    secret: process.env.SLACK_CLIENT_SECRET,
    signing: process.env.SLACK_SIGNING_SECRET,
    scopes: process.env.SLACK_SCOPES
  }
};

module.exports = () => {
    return config;
};
