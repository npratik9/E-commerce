require("dotenv").config()
const DBConfig = {
  mongodbUrl: process.env.MONGODB_URL,
  mongodbName: process.env.MONGODB_DB_NAME
};

const CloudinaryConfig = {
  cloudName: process.env.CLOUDINARY_CLOUDNAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
};
module.exports = {
    DBConfig,
    CloudinaryConfig
}