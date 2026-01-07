const authService = require("../app/auth/auth.service");
const jwt= require("jsonwebtoken");
const { AppConfig } = require("../config/config");
const { UserRoles } = require("../config/constants")

const auth = (roles = null) =>{
    return async(req, res, next) => {
        try{
            let token = req.headers["authorization"] ?? null;

            if(!token){
                throw{code:401, message:"Unauthorized access", status:"UNAUTHORIZED_ACCESS_ERR"}
            }

            token= token.replace("Bearer ", "");

            const sessionInfo= await authService.getSingleRowByFilter({
                accessToken: token
            })

            if(!sessionInfo){
                throw {code:401, message:"Session not found", status:"SESSION_NOT_FOUND_ERR"}
            }

            //sessionfound
            const decodedToken= jwt.verify(token, AppConfig.jwtSecret)

            if(decodedToken.typ !== "Bearer"){
                throw {code:400, message:"Invalid token type", status:"INVALID_TOKEN"}
            }

            if(!sessionInfo.user){
                throw {code:400, message:"Associated usernot found", status:"ASSOCIATED_USER_NOT_FOUND_ERR"}
            }

            req.loggedInUser= sessionInfo.user

            if(
                !roles || sessionInfo.user.roles === UserRoles.ADMIN || roles.includes(sessionInfo.user.roles)
            ){
                next()
            } else{
                throw{code:403, message:"Permission denied for"+sessionInfo.user.role, status:"PERMISSION_DENIED_ERR"}
            }
        } catch(exception){
            if (exception.name === "TokenExpiredError") {
              exception.code = 401;
              exception.message = exception.message;
              exception.status = "TOKEN_EXPIRED_ERR";
            } else if (exception.name === "JsonWebTokenError") {
              exception.code = 401;
              exception.message = exception.message;
              exception.status = "TOKEN_ERR";
            } 
           
            next(exception)
        }
    };

};

module.exports= auth;