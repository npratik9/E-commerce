const bodyValidator = (rules) => {
    return async(req, res, next) =>{
        try{
            const data = req.body;
            if(!data){
                next({code:422, message:"Insert Some Data", status:"VALIDATION_ERR"})
            }
            //checking data with rules
            await rules.validateAsync(data, {abortEarly: false});
            //valdiation passed
            next();
        }catch(exception){
            let errorBag = {}

            if(exception.details){
                exception.details.map((error)=>{
                    let key = error.path.pop();
                    errorBag[key]= error.message;
                })
            }
            //handling
            next({
                detail: errorBag,
                code:400,
                message:"Validation Failure",
                status:"VALIDATION_ERR"
            })
        }
    };
};

module.exports = bodyValidator;