const express = require("express");
const router = require("./router.config");
const ErrorHandler = require("../middleware/error-handler.middleware");

const app = express();

//parsers
//json
app.use(
  express.json({
    limit: "2mb",
  })
);

//url-encoded
app.use(
  express.urlencoded({
    limit: "2mb",
  })
);

//router mount
app.use("/api/v1/", router);


//error handler
app.use(ErrorHandler)

module.exports = app;
