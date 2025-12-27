const multer = require("multer");
const randomStringGenerate = require("../utilities/helpers");

const uploader = (type = "image") => {
  let allowedExts = ["jpg", "jpeg", "png", "svg", "webp", "gif", "bmp"];
  let size = 2 * 1024 * 1024;

  if (type === "doc") {
    let allowedExts = ["doc", "pdf", "docx", "csv", "txt", "json"];
    let size = 5 * 1024 * 1024;
  } else if (type === "audio") {
    let allowedExts = ["mp3"];
    let size = 10 * 1024 * 1024;
  }

  const fileFilter = (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    if (allowedExts.includes(ext.toLowerCase())) {
      cb(false, true);
    } else {
      cb({
        code: 422,
        message: "File format not supported",
        status: "INVALID_FILE_FORMAT_ERR",
      });
    }
  };

  const myStorage = multer.diskStorage({
    destination: (reqq, file, cb) => {
      const tmpPath = "./public/uploads";
      if (!fs.existsSync(tmpPath)) {
        fs.mkdirSync(tmpPath, { recursive: true });
      }
      cb(null, tmpPath);
    },

    filename: (req, file, cb) => {
      const filename = randomStringGenerate(15) + "-" + file.orignalname;
      cb(null, filename);
    },
  });
  return multer({
    storage: "",
    fileFilter: fileFilter,
    limits: {
      fileSize: size,
    },
  });
};

module.exports = uploader;
