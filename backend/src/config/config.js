require("dotenv").config()
const DBConfig = {
  mongodbUrl: process.env.MONGODB_URL,
  mongodbName: process.env.MONGODB_DB_NAME
};

module.exports = {
    DBConfig
}