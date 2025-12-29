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

const SmtpConfig = {
  smtpHost: process.env.SMTP_HOST, 
  smtpPort: process.env.SMTP_PORT, 
  smtpUser: process.env.SMTP_USER,
  smtpPassword: process.env.SMTP_PASSWORD,
  smtpFrom: process.env.SMTP_FROM_ADDRESS,
}
module.exports = {
    DBConfig,
    CloudinaryConfig,
    SmtpConfig
}