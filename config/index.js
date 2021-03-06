require("dotenv").config();

const config = {
  dev: process.env.NODE_ENV === "development",
  port: process.env.PORT || 3000,
  cors: process.env.CORS,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  secret: process.env.SECRET,
  mailUser: process.env.MAIL_USER,
  mailPassword: process.env.MAIL_PASSWORD,
  apisPeruUrl: process.env.APIS_PERU_URL,
  apisPeruToken: process.env.APIS_PERU_TOKEN,
};

module.exports = { config };
