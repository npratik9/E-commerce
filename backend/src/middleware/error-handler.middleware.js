const ErrorHandler = (error, req, res, next) =>{
    const code = error.code || 500;
    const detail = error.detail || error.details || null;
    const message= error.message || "Internal Server Error....";
    const status= error.status || "APP_ERR";

    res.status(code).json({
        error: detail,
        message: message,
        status: status
    });

};

module.exports = ErrorHandler;