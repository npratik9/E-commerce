const { Status } = require("../../config/constants");
const userSvc = require("../user/user.service");
const authMailSvc = require("./auth.mail");

class AuthController {
  registerUser = async (req, res, next) => {
    try {
      const data = await userSvc.transformToUserData(req);
      const user = await userSvc.registerUser(data);
      
      await authMailSvc.activateYourAccount(user)

      res.status(200).json({
        data: userSvc.getUserProfile(user),
        message: "user registered successfully",
        status: "ok",
      });
    } catch (exception) {
      next(exception);
    }
  };

  activateUser = async (req, res, next) => {
    try{
      const token= req.params.token;
      let userDetail= await userSvc.getSingleRowByFilter({
        activationToken: token,
      })

      if(!userDetail){
        throw{ code:404, message:"Token not found or broken", status:"TOKEN_NOT_FOUND"}
      }

      const today = Date.now()
      const expiry = userDetail.expiry.getTime()
      if(today > expiry){
        throw {code:400, message:"your token or link has expired", status:"TOKEN_EXPIRED"}
      }

      userDetail= await userSvc.upadteSingleRowByFilter(
        {
          _id: userDetail._id,
        },
        {
          status: Status.ACTIVE,
          activationToken: null,
          expiry: null
        }
      );

      await authMailSvc.welcomeMessageToUser(userDetail)

      res.json({
        data: userDetail,
        message:"Your account has been registered successfully",
        status:"ACTIVATION_SUCCESSFUL"
      })
    } catch(exception){
      throw exception
    }
  };

  resendToken = (req, res, next) => {
    res.json({
      data: null,
      message: "resending token",
      status: "ok",
    });
  };

  loginUser = (req, res, next) => {};

  getLoggedInUser = (req, res, next) => {};

  logOut = (req, res, next) => {};

  updateUserProfile = (req, res, next) => {};
}

const authCtrl = new AuthController();

module.exports = authCtrl;
