const ErrorHandler = (error, req, res, next) =>{
    console.log("Exception", error)
    let code = error.code || 500;
    let detail = error.detail || error.details || null;
    let message= error.message || "Internal Server Error....";
    let status= error.status || "APP_ERR";

    // console.log(error.name)
    if(error.name==="MongoServerError"){
        code= 422;
        message= "Db query failed";
        status= "DB_VALIDATION_ERR"
        if(+error.code === 11000){
            code= 400;
            message= "Validation Failed"
            detail= {}

            Object.keys(error.keyPattern).map((field)=>{
                detail[field]= `${field} should be unique`;
            })
        }
    }
      res.status(code).json({
        error: detail,
        message: message,
        status: status,
      });

};

module.exports = ErrorHandler;